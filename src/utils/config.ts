import "dotenv/config";

export const config = {
  host: {
    address: process.env.HOST_ADDRESS,
    port: Number(process.env.HOST_PORT),
  },
  port: {
    buzzer: Number(process.env.PORT_BUZZER),
  },
};
