import * as subs from "@/subs";
import { readFile, writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { mqtt, pub } from "./utils";

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
        console.log(`${topic}: ${JSON.stringify(message.toString())}`);
        return subs[key].callback(message);
      }
    });
  });
})();
