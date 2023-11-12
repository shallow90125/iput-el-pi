import { pub, state, zEnv } from "@/utils";
import { requestGPIOAccess } from "node-web-gpio";

export async function alarmStart() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(Number(zEnv.GPIO_BUZZER));

  await sensor.export("out");
  await sensor.write(1);

  console.log(`[${new Date().toLocaleTimeString()}] Alarm: Start`);

  pub("server", {
    on: true,
    piId: state.piId,
  });
}
