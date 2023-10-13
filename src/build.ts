import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./out/index.js",
    platform: "node",
  });
})();
