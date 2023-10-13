import "dotenv/config";

export const config = {
  address: process.env.ADDRESS,
  port: Number(process.env.PORT),
};
