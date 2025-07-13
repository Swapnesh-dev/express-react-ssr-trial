import express from "express";
import path, { dirname } from "path";
import App from "./App.js";
import { fileURLToPath } from "url";
import { renderSSR } from "@scaflo/node-react-wrapper";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const publicDir = path.join(__dirname, "..", "public");
// Serve client bundle
app.use(express.static(publicDir));
app.use("/styles", express.static(path.join(__dirname, "..", "dist")));

app.get("/", (_req, res) => {
  const html = renderSSR({
    App,
    title: "this trial SSR is working",
    cssPath: "/styles/index.css", //if used tailwind , else import css directly to the jsx
    jsPath: "/client.js",
  });

  res.send(html);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
