import { Alarm } from "@/types";
import { Queue, Worker } from "bullmq";
import { paths } from "./paths";
import { alarmStart } from "./sensor";
import { status } from "./status";
import { buttonCount } from "./stop/button-count";
import { temperature } from "./stop/temperature";

export const alarmQueue = new Queue<Alarm>("alarm");

export const alarmWorker = new Worker<Alarm>("alarm", async (job) => {
  console.log(job.name);
  await alarmStart();

  status.path = paths[Math.floor(Math.random() * paths.length)];

  switch (status.path) {
    case "/button":
      await buttonCount();
      break;
    case "/temperature":
      await temperature();
      break;
  }

  if (!job.data.dayOfWeek.length) await job.remove();
});
