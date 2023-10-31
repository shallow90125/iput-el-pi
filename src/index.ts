import { requestGPIOAccess } from "node-web-gpio";
import { SHT31 } from "sht31-node";
import { config } from "./utils/config";
import { mqtt } from "./utils/mqtt";

const client = mqtt.connect();

client.on("connect", () => {
  client.subscribe("alarmStart");
  client.subscribe("alarmStop");
  client.subscribe("temperature");
});

client.on("message", async (topic, message) => {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(config.port.buzzer);
  if (sensor) {
    await sensor.export("out");
  } else {
    console.error("error");
  }

  if (!sensor) {
    console.log("tunagattemasen");
    return;
  }

  if (topic === "alarmStart") {
    console.log("Alarm Start");
    sensor.write(1);
  }
  // if (topic === "alarmStop") {
  //   console.log("Alarm stop");
  //   sensor.write(0);
  // }
  const a = setInterval(async () => {
    if (topic === "temperature") {
      const sht = new SHT31();
      const data = await sht.readSensorData();
      data.temperature = Math.round(data.temperature * 10) / 10;
      data.humidity = Math.round(data.humidity * 10) / 10;
      console.log("温度：", data.temperature, "湿度：", data.humidity);
      if (data.temperature >= 28) {
        console.log("Alarm Stop");
        sensor.write(0);
        await client.publishAsync("111", "Temperature 28° degrees alarm stop");
        clearInterval(a);
      }
    }
  }, 5000);
});

// client.on("connect", function () {
//   const alarm = {
//     hour: null,
//     minute: null,
//     dayOfWeek: [],
//     isEnabled: null,
//     timezone: null,
//   };

//   client.on("message", function (topic, message) {
//     if (topic === "alarm/data") {
//       const data = JSON.parse(message.toString());
//       alarm.hour = data.hour;
//       alarm.minute = data.minute;
//       alarm.dayOfWeek = data.dayOfWeek;
//       alarm.isEnabled = data.isEnabled;
//       alarm.timezone = data.timezone;
//     }
//   });
//   client.publish("alarm/data", JSON.stringify(alarm));
// });
