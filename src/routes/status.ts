import { alarmStatus } from "@/utils";
import { Hono } from "hono";

export const status = new Hono();

status.get("status", async (c) => {
  const status = await alarmStatus();
  return c.json({ status: status });
});
