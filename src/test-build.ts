import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/test.ts"],
    external: ["i2c-bus"],
    bundle: true,
    outfile: "./out/test.js",
    platform: "node",
  });
})();
