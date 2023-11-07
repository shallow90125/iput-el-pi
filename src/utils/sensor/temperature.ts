import { PubTopic } from "@/types/Topic";
import { pub, zEnv } from "@/utils";
import { readFile } from "fs/promises";
import { requestGPIOAccess } from "node-web-gpio";
import { SHT31 } from "sht31-node";

export async function Temperature(): Promise<PubTopic> {
  let id: string;
  const dataId = await readFile(`id.json`, "utf-8");
  id = JSON.parse(dataId).id;
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(Number(zEnv.GPIO_BUZZER));
  if (sensor) {
    await sensor.export("out");
  } else {
    console.error("error");
  }
  if (!sensor) {
    console.log("tunagattemasen");
    return;
  }
  const a = setInterval(async () => {
    const sht = new SHT31();
    const data = await sht.readSensorData();
    data.temperature = Math.round(data.temperature * 10) / 10;
    data.humidity = Math.round(data.humidity * 10) / 10;
    // mqtt.publish("server", `${data.temperature}`);
    pub("server", {
      piId: id,
      temperature: data.temperature,
    });
    console.log("温度：", data.temperature, "湿度：", data.humidity);
    if (data.temperature >= 28) {
      console.log("Alarm Stop");
      sensor.write(0);
      // mqtt.publish("server", "temperature 28° degrees alarm stop");
      pub("server", { piId: id, on: false });
      clearInterval(a);
    }
  }, 1000);
}
