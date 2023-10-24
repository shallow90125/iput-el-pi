import { Queue, Worker } from "bullmq";
import { alarmStart } from "./sensor";
import { buttonCount } from "./stop/button-count";

export const alarmQueue = new Queue<Alarm>("alarm");

export const alarmWorker = new Worker<Alarm>("alarm", async (job) => {
  console.log(job.name);
  await alarmStart();
  await buttonCount();
  if (!job.data.dayOfWeek.length) await job.remove();
});
