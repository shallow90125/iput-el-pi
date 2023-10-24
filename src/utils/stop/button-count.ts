import { requestGPIOAccess } from "node-web-gpio";
import { alarmStop } from "../sensor";

export async function buttonCount() {
  const gpioAccess = await requestGPIOAccess();
  const button = gpioAccess.ports.get(4);
  await button.export("in");

  let i = 0;
  await new Promise((resolve, _) => {
    button.onchange = (v) => {
      console.log(i);
      if (i == 10) resolve(null);
      if (v.value) i++;
    };
  });
  button.onchange = undefined;
  alarmStop();
}
