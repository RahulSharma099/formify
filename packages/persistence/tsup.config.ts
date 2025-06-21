import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  dts: true,
  clean: true,
  format: ["cjs"],
  ...options,
}));
