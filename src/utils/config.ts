import "dotenv/config";

export const config = {
  host: {
    address: process.env.ADDRESS,
    port: Number(process.env.PORT),
  },
  mongodb: {
    address: process.env.MONGODB_ADDRESS,
    db: process.env.MONGODB_DB,
  },
};
