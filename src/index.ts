import * as subs from "@/subs";
import { serve } from "@hono/node-server";
import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { ObjectId } from "mongodb";
import { mqtt, pub, zEnv } from "./utils";

(async () => {
  console.log("index.ts");
  // mqtt.subscribe("temperature");

  let id: string;
  try {
    const data = await readFile(`id.json`, "utf8");
    id = JSON.parse(data).id;
  } catch (e) {
    id = new ObjectId().toString();
    await writeFile("id.json", JSON.stringify({ id: id })).catch(() => {});
  }

  pub("server", { piId: id });

  (Object.keys(subs) as (keyof typeof subs)[]).map((key) =>
    mqtt.subscribe(`${key}/${id}`),
  );

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

  app.get("/", async (c) => c.text(`piId: ${id}`));

  serve({ ...app, hostname: zEnv.ADDRESS, port: Number(zEnv.PORT) }, (info) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] http://${info.address}:${
        info.port
      }`,
    );
  });
})();
