import { Queue, Worker } from "bullmq";
import { alarmStart } from "./sensor";
import { status } from "./status";
import { buttonCount } from "./stop/button-count";
import { temperature } from "./stop/temperature";

export const alarmQueue = new Queue<Alarm>("alarm");

export const alarmWorker = new Worker<Alarm>("alarm", async (job) => {
  console.log(job.name);
  await alarmStart();

  status.method = Math.floor(Math.random() * 2);

  switch (status.method) {
    case 0:
      await buttonCount();
      break;
    case 1:
      await temperature();
      break;
  }

  if (!job.data.dayOfWeek.length) await job.remove();
});
