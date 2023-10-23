import { alarmQueue } from "@/utils";
import { zValidator } from "@hono/zod-validator";
import { RedisConnection } from "bullmq";
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
    await alarmQueue.obliterate({ force: true });

    alarms.forEach(async (alarm) => {
      const cron = [];
      cron.push("0");
      cron.push(String(alarm.minute));
      cron.push(String(alarm.hour));
      cron.push("*");
      cron.push("*");
      cron.push(alarm.dayOfWeek.length ? alarm.dayOfWeek.join(",") : "*");

      await alarmQueue.add(cron.join(" "), alarm, {
        repeat: {
          pattern: cron.join(" "),
        },
      });
    });
    const redis = await new RedisConnection().client;
    await redis.save((a) => console.log(a));

    return c.text("ok");
  },
);
