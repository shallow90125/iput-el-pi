import { Agenda } from "@hokify/agenda";
import { config } from "./config";

export const agenda = new Agenda({
  db: { address: config.mongodb.address + config.mongodb.db },
});

agenda.define<Alarm>("alarm", async (job) => {
  if (!job.attrs.data.dayOfWeek.length) {
    job.attrs.data.isEnabled = false;
    job.disable();
  }

  await job.save();
});
