import { config } from "@/utils";
import { requestGPIOAccess } from "node-web-gpio";

export async function alarmStop() {
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
  console.log("Alarm Stop");
  sensor.write(0);
}
