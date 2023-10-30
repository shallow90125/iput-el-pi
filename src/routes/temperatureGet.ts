import { Hono } from "hono";
import { SHT31 } from "sht31-node";

export const temperatureGet = new Hono();

temperatureGet.get("/temperature", async (c) => {
  const sht = new SHT31();
  const data = await sht.readSensorData();
  data.temperature = Math.round(data.temperature * 10) / 10;
  data.humidity = Math.round(data.humidity * 10) / 10;

  return c.json(data);
});
