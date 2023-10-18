import "dotenv/config";

export const config = {
  host: {
    address: process.env.HOST_ADDRESS,
    port: Number(process.env.HOST_PORT),
  },
  mongodb: {
    address: process.env.MONGODB_ADDRESS,
    db: process.env.MONGODB_DB,
  },
  port: {
    buzzer: Number(process.env.PORT_BUZZER),
  },
};
