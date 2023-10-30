import * as routes from "@/routes";
import { alarmWorker, config } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

(async () => {
  alarmWorker;

  const app = new Hono({});

  app.use("*", logger());
  app.onError((error, c) => {
    console.error(error);
    return c.text(error.message, 500);
  });

  (Object.keys(routes) as (keyof typeof routes)[]).map((key) =>
    app.route("/", routes[key]),
  );

  serve(
    { ...app, hostname: config.host.address, port: config.host.port },
    (info) => {
      console.log(`Listening on http://${info.address}:${info.port}`);
    },
  );
})();
