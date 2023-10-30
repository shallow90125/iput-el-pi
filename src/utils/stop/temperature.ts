import { SHT31 } from "sht31-node";
import { setTimeout } from "timers/promises";
import { alarmStop } from "../sensor";

export async function temperature() {
  const sht = new SHT31();
  while (true) {
    const data = await sht.readSensorData();
    if (40 < data.temperature) break;
    await setTimeout(1000);
  }
  await alarmStop();
}
