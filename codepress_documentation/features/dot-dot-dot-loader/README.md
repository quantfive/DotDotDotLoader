---
feature: dot-dot-dot-loader
area: lib/components/DotDotDotLoader
created: 2026-05-07
last_updated: 2026-05-07
---

# DotDotDotLoader

## Overview

`react-dotdotdotloader` is a lightweight React component that renders an animated ellipsis (dot-dot-dot) loading indicator. It animates dots sequentially at a configurable interval and can be toggled on or off, making it useful as an inline loading state indicator next to text or inside UI elements. The component inherits CSS text styles from its parent container, so no additional styling configuration is required.

## Architecture

The library is a single React class component (`DotDotDotLoader`) published to npm. It manages its own animation state internally using a recursive `setTimeout` loop, starting and stopping based on the `show` prop. The compiled output lives in `lib/` (built via Babel) and is the entrypoint declared in `package.json`. The `src/` directory contains the demo application (created with Create React App) that showcases the component with interactive controls for all props.

The server (`server/`) is a minimal Express app that serves the pre-built demo (`build/`) as a static site, used for hosting the live demo.

## Key Files

- `lib/components/DotDotDotLoader/DotDotDotLoader.js` - Compiled library component (the published artifact)
- `lib/index.js` - Library entry point, re-exports `DotDotDotLoader`
- `src/App.js` - Demo application showing the component in multiple styling contexts
- `src/node_modules/components/DotDotDotLoader/DotDotDotLoader.js` - Component source (pre-compile)
- `server/app.js` - Express server serving the built demo app
- `package.json` - Declares `lib/index.js` as the npm package entry point

## Component Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `show` | Boolean | `false` | Controls visibility and animation. `true` starts the loader, `false` stops and resets it. |
| `amount` | Integer | `3` | Maximum number of dots to display before cycling (used when `repeat` is `true`). |
| `interval` | Integer | `500` | Milliseconds between each dot appearing. |
| `repeat` | Boolean | `true` | When `true`, the dots cycle from 1 back to 1 after reaching `amount`. When `false`, dots accumulate indefinitely until `show` is `false`. |

## Keywords

ellipsis loader, dot loader, animated dots, loading indicator, react component, dotdotdot, ..., spinner alternative, inline loader, text loader, npm package, react-dotdotdotloader
