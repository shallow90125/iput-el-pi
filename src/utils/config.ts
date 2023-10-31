import "dotenv/config";

export const config = {
  port: {
    buzzer: Number(process.env.PORT_BUZZER),
  },
  mqtt: {
    address: process.env.MQTT_ADDRESS!,
    username: process.env.MQTT_USERNAME!,
    password: process.env.MQTT_PASSWORD!,
    clientId: process.env.MQTT_CLIENT_ID!,
  },
};
