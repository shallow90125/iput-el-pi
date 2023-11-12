import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    external: ["i2c-bus", "raspi", "raspi-soft-pwm"],
    bundle: true,
    outfile: "./out/index.js",
    platform: "node",
  });
})();
