import { requestGPIOAccess } from "node-web-gpio";

export async function alarmStart() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(18);
  sensor.write(1);
}

export async function alarmStop() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(18);
  sensor.write(0);
}
