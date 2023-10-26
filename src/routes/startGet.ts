import { alarmStart } from "@/utils";
import { Hono } from "hono";

export const start = new Hono();

start.get("/start", async (c) => {
  await alarmStart();
  return c.text("ok");
});
