---
feature: dotdotdot-loader-component
area: lib/components
created: 2026-06-01
last_updated: 2026-06-01
---

# DotDotDotLoader Component

## Overview

DotDotDotLoader is a React class component that renders an animated ellipsis ("...") loading indicator as a plain text span. It provides a lightweight, stylable dot-by-dot loading animation that can be shown or hidden via props and inherits CSS text styling from its parent container. The component is published to npm as `react-dotdotdotloader` for easy integration into any React application.

## Architecture

The component uses a recursive `setTimeout` loop as its animation engine. An internal `dotState` counter tracks how many dots have been appended; on each tick it either appends a dot to the `dots` string or resets to a single dot when the count reaches the configured `amount` (if `repeat` is true). The `show` prop drives start/stop: mounting or receiving `show=true` starts the timer loop, while `show=false` clears the timeout and resets state. Props are synced from `componentDidMount` and the legacy `componentWillReceiveProps` lifecycle. The render output is a single `<span className="dotDotDotLoader">` containing the current dots string, or null when hidden, making CSS styling fully inherited from the parent.

## Key Files

- `lib/components/DotDotDotLoader/DotDotDotLoader.js` — Core component implementation: class-based React component with animation timer logic and render output
- `lib/index.js` — Library entry point: re-exports `DotDotDotLoader` as a named export for consumers
- `lib/components/DotDotDotLoader/package.json` — Component-level package descriptor pointing to the compiled JS file
- `package.json` — Root npm package manifest defining package name, version, main entry, scripts, and keywords

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | Boolean | `false` | Controls visibility and animation. `true` starts the dot animation loop; `false` stops the timer and hides the component. Required to show/hide the loader. |
| `amount` | Integer | `3` | Maximum number of dots before cycling back to one dot (when `repeat` is true). |
| `interval` | Integer | `500` | Milliseconds between each dot appearing in the animation sequence. |
| `repeat` | Boolean | `true` | When `true`, the animation loops from one dot back to the configured `amount`. When `false`, dots accumulate indefinitely until `show` becomes `false`. |

## NPM Package

- **Name**: `react-dotdotdotloader`
- **Version**: `1.0.7`
- **Entry point**: `lib/index.js`

## Keywords

react, loader, ellipsis, dotdotdot, animation, dots, loading indicator, spinner, text loader, animated ellipsis, MIT
