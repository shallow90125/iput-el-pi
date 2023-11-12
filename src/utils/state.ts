import { State } from "@/types";
import { readFileSync, writeFileSync } from "fs";
import { ObjectId } from "mongodb";

let piId: string;

try {
  const json = readFileSync("./out/id.json", { encoding: "utf-8" });
  piId = JSON.parse(json).id;
} catch (error) {
  piId = new ObjectId().toString();
  try {
    writeFileSync("./out/id.json", JSON.stringify({ id: piId }));
  } catch (error) {
    piId = "";
  }
}

export let state: State = {
  piId: piId,
  interval: undefined,
};
