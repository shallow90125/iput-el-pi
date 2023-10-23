import { requestGPIOAccess } from "node-web-gpio";
import { config } from "./config";

export async function alarmStart() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(config.port.buzzer);
  sensor.write(1);
  console.log("alarm: start");
}

export async function alarmStop() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(config.port.buzzer);
  sensor.write(0);
  console.log("alarm: stop");
}
