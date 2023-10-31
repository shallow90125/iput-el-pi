import { connect } from "mqtt";
import { config } from "./config";

export const mqtt = connect(config.mqtt.address, {
  username: config.mqtt.username,
  password: config.mqtt.password,
  clientId: config.mqtt.clientId,
});
