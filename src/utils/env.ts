import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  ADDRESS: z.string(),
  PORT: z.string(),
  MQTT_URL: z.string(),
  MQTT_USERNAME: z.string(),
  MQTT_PASSWORD: z.string(),
  MQTT_CLIENT_ID: z.string(),
  GPIO_BUZZER: z.string(),
});

export const zEnv = envSchema.parse(
  Object.assign(
    {},
    ...Object.keys(process.env).map((v) => ({ [v]: process.env[v] })),
  ),
);
