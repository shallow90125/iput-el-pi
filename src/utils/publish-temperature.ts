import { pub, state } from "@/utils";
import { SHT31 } from "sht31-node";
import { alarmStop } from "./alarm-stop";

export async function publishTemperature() {
  state.interval = setInterval(async () => {
    const sht = new SHT31();
    const data = await sht.readSensorData();

    const temperature = Math.round(data.temperature * 10) / 10;

    pub("server", {
      piId: state.piId,
      temperature: temperature,
    });

    if (29 < temperature) {
      alarmStop();
      clearInterval(state.interval);
    }
  }, 1000);
}
