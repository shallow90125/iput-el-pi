import { Sub } from "@/types/Sub";
import { pub } from "@/utils";
import { alarmStart } from "@/utils/sensor/alarmStart";
import { alarmStop } from "@/utils/sensor/alarmStop";
import { Temperature } from "@/utils/sensor/temperature";
import { readFile } from "fs/promises";
export const set = new Sub("set", async (payload) => {
  let id: string;
  const data = await readFile(`id.json`, "utf-8");
  id = JSON.parse(data).id;
  // Messageが来た時の処理
  if (payload.on === true) {
    pub("server", {
      on: true,
      piId: id,
    });
    alarmStart();
  } else {
    pub("server", {
      on: false,
      piId: id,
    });
    alarmStop();
  }

  if (payload.mode === "temperature") {
    Temperature();
  }
});
