import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import path, { dirname } from 'path';
import App from './App.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// API endpoint
app.get('/api/data', (req, res) => {
  res.json({ name: 'swapnesh' });
});

const publicDir = path.join(__dirname, '..', 'public');
// Serve client bundle
app.use(express.static(publicDir));
app.use("/styles", express.static(path.join(__dirname, "..", "dist")));



// SSR endpoint
app.get("/", (_req, res) => {
  console.log(`${__dirname}/dist/client.js`);
  const reactHtml = renderToString(
    React.createElement(App)
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>SSR + Hydration</title>
        <link rel="stylesheet" href="/styles/index.css" />
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
