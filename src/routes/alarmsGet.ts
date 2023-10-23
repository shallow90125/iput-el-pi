import { alarmQueue } from "@/utils";
import { Hono } from "hono";

export const alarmsGet = new Hono();

alarmsGet.get("/alarms", async (c) => {
  const data = (await alarmQueue.getJobs()).map((job) => job.data);

  return c.json(data);
});
