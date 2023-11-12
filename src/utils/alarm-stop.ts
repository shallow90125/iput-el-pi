import { pub, state, zEnv } from "@/utils";
import { requestGPIOAccess } from "node-web-gpio";

export async function alarmStop() {
  const gpioAccess = await requestGPIOAccess();
  const sensor = gpioAccess.ports.get(Number(zEnv.GPIO_BUZZER));

  await sensor.export("out");
  await sensor.write(0);

  console.log(`[${new Date().toLocaleTimeString()}] Alarm: Stop`);

  pub("server", {
    on: false,
    piId: state.piId,
  });
}
