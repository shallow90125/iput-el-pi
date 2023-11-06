import { PubTopic } from "@/types/Topic";
import { mqtt } from "./mqtt";

export function pub<K extends keyof PubTopic>(topic: K, payload: PubTopic[K]) {
  mqtt.publish(`${topic}`, JSON.stringify(payload), (error) => {
    if (error) {
      console.log(
        `[${new Date().toLocaleTimeString()}] Pub "${topic}": Failed`,
      );
    } else {
      console.log(
        `[${new Date().toLocaleTimeString()}] Pub "${topic}": Succeeded`,
      );
    }
  });
}
