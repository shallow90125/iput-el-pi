import { status } from "@/utils";
import { Hono } from "hono";

export const statusGet = new Hono();

statusGet.get("status", async (c) => {
  return c.json(status);
});
