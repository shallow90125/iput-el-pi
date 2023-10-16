import { Hono } from "hono";
import { scheduledJobs } from "node-schedule";

export const jobs = new Hono();

jobs.get("/jobs", async (c) => {
  console.log(Object.values(scheduledJobs));
  return c.text("e");
});
