import { agenda } from "@/utils";
import { Hono } from "hono";

export const alarmsGet = new Hono();

alarmsGet.get("/alarms", async (c) => {
  const data = (await agenda.jobs({ name: "alarm" })).map(
    (job) => job.attrs.data,
  ) as Alarm[];

  return c.json(data);
});
