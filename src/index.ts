import { readFile, writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { requestGPIOAccess } from "node-web-gpio";
import { SHT31 } from "sht31-node";
import { config } from "./utils/config";
import { mqtt } from "./utils/mqtt";

(async () => {
  console.log("index.ts");
  const client = mqtt.connect();
  let id: string;

  try {
    const data = await readFile(`id.json`, "utf8");
    id = JSON.parse(data).id;
  } catch (e) {
    id = new ObjectId().toString();
    await writeFile("id.json", JSON.stringify({ id: id })).catch(() => {});
  }

  client.publish("server", JSON.stringify({ piId: id }));

  client.on("message", async (topic, message) => {
    console.log(`${topic}: ${JSON.stringify(message.toString())}`);
    if (topic === `set/${id}`) {
      console.log(message);
      console.log("ok!");
    }
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

    console.log("Alarm Start");
    sensor.write(1);

    console.log("Alarm stop");
    sensor.write(0);

    const a = setInterval(async () => {
      const sht = new SHT31();
      const data = await sht.readSensorData();
      data.temperature = Math.round(data.temperature * 10) / 10;
      data.humidity = Math.round(data.humidity * 10) / 10;
      client.publish("set/", `${data.temperature}`);
      console.log("温度：", data.temperature, "湿度：", data.humidity);
      if (data.temperature >= 28) {
        console.log("Alarm Stop");
        sensor.write(0);
        client.publish("set/", "Temperature 28° degrees alarm stop");
        clearInterval(a);
      }
    }, 1000);
  });
})();
