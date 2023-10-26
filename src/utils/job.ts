import { Queue, Worker } from "bullmq";
import { alarmStart } from "./sensor";
import { temperature } from "./stop/temperature";

export const alarmQueue = new Queue<Alarm>("alarm");

export const alarmWorker = new Worker<Alarm>("alarm", async (job) => {
  console.log(job.name);
  await alarmStart();
  // await buttonCount();
  await temperature();
  if (!job.data.dayOfWeek.length) await job.remove();
});
