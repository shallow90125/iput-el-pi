import * as routes from "@/routes";
import { config } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono({});

app.use("*", logger());
app.onError((error, c) => {
  console.error(error);
  return c.text(error.message, 500);
});

(Object.keys(routes) as (keyof typeof routes)[]).map((key) =>
  app.route("/", routes[key]),
);

serve({ ...app, hostname: config.address, port: config.port }, (info) => {
  console.log(`Listening on http://${info.address}:${info.port}`);
});
