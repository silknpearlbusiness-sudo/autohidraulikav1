import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "node-server",
  rollupConfig: {
    output: {
      entryFileNames: "[name].mjs",
    },
  },
});
