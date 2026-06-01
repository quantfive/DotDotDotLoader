---
feature: demo-app-server
area: src, server
created: 2026-06-01
last_updated: 2026-06-01
---

# Demo App & Server

## Overview

The DotDotDotLoader demo app is a React-based interactive showcase for the `react-dotdotdotloader` library. It renders three instances of `DotDotDotLoader` with different CSS styles (unstyled, red large font, and oversized purple dots) and exposes live controls for all component props — dot count, animation interval, repeat toggle, and show/hide toggle. It serves as both a visual reference and a functional testbed for the component's configuration options.

## Architecture

The app is a single-page React application (class-based components, React 16) built with a custom Webpack configuration via `scripts/start.js` and `scripts/build.js`. The production build outputs static assets to a `/build` directory, which is then served by a minimal Express.js server. The client-side React app handles all routing; the server uses a catch-all wildcard route to always return `index.html`. Development uses `webpack-dev-server` while production uses the Express server via the `serve` npm script.

## Key Files

- `src/App.js` — Main React component: renders the interactive demo UI with prop controls and three styled `DotDotDotLoader` instances
- `src/App.css` — Demo layout styles including the three display variants (`noStyle`, `redStyle`, `greenStyle`/`dotStyle`) and toggle switch UI
- `src/Watermark.js` — Watermark component rendering a HelloDeploy attribution link
- `server/app.js` — Express app configuration: serves static build assets and falls back to `index.html` for all routes
- `server/index.js` — Express server entry point that starts listening on `PORT` (default 3000)
- `Dockerfile` — Docker image definition: installs dependencies via yarn, copies pre-built assets and server code, runs `yarn serve`

## Express Server

The Express server is split into two files: `server/app.js` configures static middleware for `/static` (serving `build/static`) and `/icons` (serving `build` root), plus a wildcard GET handler that returns `build/index.html` for all unmatched routes to support client-side navigation. `server/index.js` binds the app to the `PORT` environment variable, defaulting to 3000.

## Docker

The Dockerfile uses `node:latest`, sets `/usr/src/app` as the working directory, installs yarn and runs `yarn install`, then copies the pre-built `/build` directory and `/server` directory into the image. Exposes port 3000 and starts with `yarn serve`. The React build step is expected to happen outside Docker before image creation.

## Keywords

react, demo app, express, static file server, Docker, webpack, interactive props, showcase, dev server, webpack-dev-server, react 16, class component, serve
