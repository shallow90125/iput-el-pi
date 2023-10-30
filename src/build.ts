import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    external: ["i2c-bus"],
    bundle: true,
    outfile: "./out/index.js",
    platform: "node",
  });
})();
