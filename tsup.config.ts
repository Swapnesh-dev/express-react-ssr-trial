// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig([
  // ——————————————— CLIENT BUNDLE ———————————————
  {
    entry: ["src/client.tsx"], // your React entry
    outDir: "public", // where Express serves static files
    format: ["esm"], // ES module (browser)
    splitting: false, // single file
    bundle: true,
    sourcemap: process.env.NODE_ENV === "development",
    clean: true, // wipe public/ before build
    minify: false, // set to true in production
    target: "es2017", // adjust per your browserslist
    loader: { ".tsx": "tsx" }, // handle TSX
    platform: "browser", // bundle for browser
    noExternal: ["react", "react-dom", "@scaflo/ui"],
  },

  // ——————————————— SERVER BUILD ———————————————
  {
    entry: ["src/index.ts"], // your Express app
    outDir: "dist", // where you want your server code
    format: ["esm"], // ES module (Node.js)
    splitting: true, // code‑splitting OK for libs
    sourcemap: process.env.NODE_ENV === "development",
    clean: false, // don’t wipe public/ again
    dts: true, // emits .d.ts for your API
    treeshake: "recommended",
    bundle: true,
    target: "node18", // or your runtime
    platform: "node",
    onSuccess: "node dist/index.js",
  },
]);
