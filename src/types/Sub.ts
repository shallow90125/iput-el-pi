import { SubTopic } from "./Topic";

export class Sub<K extends keyof SubTopic> {
  readonly callback = async (buffer: Buffer) => {
    const payload: SubTopic[K] = JSON.parse(buffer.toString());
    await this.process(payload);
  };

  private process: (payload: SubTopic[K]) => Promise<void>;

  constructor(topic: K, callback: (payload: SubTopic[K]) => Promise<void>) {
    this.process = callback;
  }
}
