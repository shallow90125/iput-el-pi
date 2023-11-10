import { pub, state } from "@/utils";
import { SHT31 } from "sht31-node";
import { alarmStop } from "./alarm-stop";

export async function publishTemperature() {
  state.interval = setInterval(async () => {
    const sht = new SHT31();
    const data = await sht.readSensorData();

    pub("server", {
      piId: state.piId,
      temperature: Math.round(data.temperature * 10) / 10,
    });

    if (data.temperature > 27) {
      alarmStop();
      clearInterval(state.interval);
    }
  }, 1000);
}
