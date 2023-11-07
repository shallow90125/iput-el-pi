export interface PiDoc {
  temperature: number;
  mode: Mode;
  piId: string;
  uid: string;
  on: boolean;
}

export type Mode = "button" | "temperature";

// const a: Pick<PiDoc, "piId" | "on" | "temperature">;
// const b: Pick<PiDoc, "piId" | "on">;
