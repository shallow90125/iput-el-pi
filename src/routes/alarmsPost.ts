import { agenda } from "@/utils";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const alarmsPost = new Hono();

alarmsPost.post(
  "/alarms",
  zValidator(
    "json",
    z.array(
      z.object({
        hour: z.number().gte(0).lte(23),
        minute: z.number().gte(0).lte(59),
        dayOfWeek: z.array(z.number().gte(0).lte(6)).max(7),
        isEnabled: z.boolean(),
        timezone: z.string(),
      }),
    ),
  ),
  async (c) => {
    const alarms = c.req.valid("json") as Alarm[];
    await agenda.cancel({});

    alarms.forEach(async (alarm) => {
      const job = agenda.create<Alarm>("alarm", alarm);

      const cron = [];
      cron.push(String(alarm.minute));
      cron.push(String(alarm.hour));
      cron.push("*");
      cron.push("*");
      cron.push(alarm.dayOfWeek.length ? alarm.dayOfWeek.join(",") : "*");

      job.repeatEvery(cron.join(" "), { timezone: alarm.timezone });
      if (!alarm.isEnabled) job.disable();

      await job.save();
    });

    return c.text("ok");
  },
);
