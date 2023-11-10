import "dotenv/config";
import { z } from "zod";

const varSchema = z.string().min(1);

const envSchema = z.object({
  ADDRESS: varSchema,
  PORT: varSchema,
  MQTT_URL: varSchema,
  MQTT_USERNAME: varSchema,
  MQTT_PASSWORD: varSchema,
  MQTT_CLIENT_ID: varSchema,
  GPIO_BUZZER: varSchema,
});

export const zEnv = envSchema.parse(
  Object.assign(
    {},
    ...Object.keys(process.env).map((v) => ({ [v]: process.env[v] })),
  ),
);
