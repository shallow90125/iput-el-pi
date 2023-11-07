import { PiDoc } from "./PiDoc";
import { Temperature } from "./Temperature";

export interface PubTopic {
  temperature: Temperature;
  server: Partial<PiDoc> & Pick<PiDoc, "piId">;
}

export interface SubTopic {
  set: Pick<PiDoc, "piId" | "on" | "mode">;
}
