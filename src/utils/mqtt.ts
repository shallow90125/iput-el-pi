import { connect } from "mqtt";
import { zEnv } from "./env";

export const mqtt = connect(zEnv.MQTT_URL, {
  username: zEnv.MQTT_USERNAME,
  password: zEnv.MQTT_PASSWORD,
  clientId: zEnv.MQTT_CLIENT_ID,
});
