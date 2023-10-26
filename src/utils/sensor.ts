import { requestGPIOAccess } from "node-web-gpio";
import { config } from "./config";

let status = false;

export async function alarmStart() {
  try {
    const gpioAccess = await requestGPIOAccess();
    const sensor = gpioAccess.ports.get(config.port.buzzer);
    await sensor.export("out");
    await sensor.write(1);
    status = true;
  } catch {}
  console.log("alarm: start");
}

export async function alarmStop() {
  try {
    const gpioAccess = await requestGPIOAccess();
    const sensor = gpioAccess.ports.get(config.port.buzzer);
    await sensor.export("out");
    await sensor.write(0);
    status = false;
  } catch {}
  console.log("alarm: stop");
}

export async function alarmStatus() {
  console.log("alarm: status");
  return status;
}
