import { requestGPIOAccess } from "node-web-gpio";
import { config } from "./config";
import { status } from "./status";

export async function alarmStart() {
  try {
    const gpioAccess = await requestGPIOAccess();
    const sensor = gpioAccess.ports.get(config.port.buzzer);
    await sensor.export("out");
    await sensor.write(1);
    status.isOn = true;
  } catch {}
  console.log("alarm: start");
}

export async function alarmStop() {
  try {
    const gpioAccess = await requestGPIOAccess();
    const sensor = gpioAccess.ports.get(config.port.buzzer);
    await sensor.export("out");
    await sensor.write(0);
    status.isOn = false;
  } catch {}
  console.log("alarm: stop");
}
