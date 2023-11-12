import * as subs from "@/subs";
import { mqtt, pub, state, zEnv } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { init } from "raspi";
import { SoftPWM } from "raspi-soft-pwm";

(async () => {
  init(() => {
    const buzzer = new SoftPWM("GPIO12");
    buzzer.write(0.5);
  });

  console.log(state);

  pub("server", { piId: state.piId });

  (Object.keys(subs) as (keyof typeof subs)[]).map((key) =>
    mqtt.subscribe(`${key}/${state.piId}`),
  );

  mqtt.on("connect", () => {
    console.log(`[${new Date().toLocaleTimeString()}] ${zEnv.MQTT_URL}`);
  });

  mqtt.on("message", async (topic, message) => {
    console.log(topic);
    (Object.keys(subs) as (keyof typeof subs)[]).map((key) => {
      if (topic.split("/")[0] === key) {
        console.log(`${topic}: ${message}`);
        return subs[key].callback(message);
      }
    });
  });

  const app = new Hono();

  app.use("*", logger());
  app.onError((error, c) => {
    console.error(error);
    return c.text(error.message, 500);
  });

  app.get("/", async (c) => c.text(`piId: ${state.piId}`));

  serve({ ...app, hostname: zEnv.ADDRESS, port: Number(zEnv.PORT) }, (info) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] http://${info.address}:${
        info.port
      }`,
    );
  });
})();
