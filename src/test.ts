import "dotenv/config";
import { connect } from "mqtt";
import { config } from "./utils/config";

console.log("test.ts");

const mqtt = connect(config.mqtt.address, {
  username: config.mqtt.username,
  password: config.mqtt.password,
  clientId: config.mqtt.clientId + "aaa",
});

mqtt.subscribe("ID");

mqtt.on("connect", () => {
  console.log("aa");

  mqtt.publish("alarmStart", "start");
  console.log("alarmstart");
  // mqtt.publish("alarmStop", "stop");
  // console.log("Alarm stopp");
  mqtt.publish("temperature", "temp");

  mqtt.subscribe("111");
});
mqtt.on("message", async (topic, message) => {
  if (topic === "111") {
    console.log(message.toString());
  }
  const random = (Math.random() * 9000 + 1000).toFixed(0);
  mqtt.publish("indexID", `${random}`);
});
