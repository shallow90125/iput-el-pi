import { alarmStart } from "@/utils";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { gracefulShutdown, scheduleJob, scheduledJobs } from "node-schedule";
import { z } from "zod";

export const set = new Hono();

set.post(
  "/set",
  zValidator(
    "json",
    z.array(
      z.object({
        id: z.string(),
        hour: z.number().gte(0).lte(23),
        minute: z.number().gte(0).lte(59),
        dayOfWeek: z.array(z.number().gte(0).lte(6)).max(7),
      }),
    ),
  ),
  async (c) => {
    const data = c.req.valid("json");
    await gracefulShutdown();
    data.forEach((alarm) => {
      scheduleJob(
        alarm.id,
        { hour: alarm.hour, minute: alarm.minute, dayOfWeek: alarm.dayOfWeek },
        async () => {
          if (alarm.dayOfWeek.length) scheduledJobs[alarm.id].cancel();
          console.log("alarm");
          await alarmStart();
        },
      );
    });

    return c.text("ok");
  },
);
