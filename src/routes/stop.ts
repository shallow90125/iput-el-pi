import { alarmStop } from "@/utils";
import { Hono } from "hono";

export const stop = new Hono();

stop.get("/stop", async (c) => {
  await alarmStop();
  return c.text("ok");
});
