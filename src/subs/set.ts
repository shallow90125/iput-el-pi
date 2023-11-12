import { Sub } from "@/types/Sub";
import { alarmStart, alarmStop, publishTemperature } from "@/utils";
import { state } from "@/utils/state";

export const set = new Sub("set", async (payload) => {
  if (!payload.on) return await alarmStop();

  if (state.interval) clearInterval(state.interval);

  await alarmStart();

  if (payload.mode == "temperature") publishTemperature();
});
