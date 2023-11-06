import { config } from "@/utils";
import { requestGPIOAccess } from "node-web-gpio";

export async function alarmStart() {
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
}
