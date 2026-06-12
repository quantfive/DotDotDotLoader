---
name: start-app-server
description: "Start the DotDotDotLoader app server in a Docker container and validate it responds. Uses a pre-validated recipe — no discovery, no guessing. Triggers on: 'spin up the server', 'run my app', 'start the server', 'verify app server', 'test my server', 'run app server', 'spin up the app'."
user_invocable: true
codepress_generated: true
---

# Start App Server — DotDotDotLoader

Fast-path skill for starting DotDotDotLoader's app server. All discovery was done during bootstrap on 2026-06-12T00:28:07Z — just execute.

The recipe lives at `.codepress/start-app-server/recipe.json`. This skill is the human-readable companion.

## Tools

These tools are pre-loaded — call them directly:

- `build_and_start_app_server` — build image + start container in one step
- `forward_app_request` — HTTP request into the running container
- `get_app_server_logs` — container stdout/stderr
- `stop_app_server` — clean up when done
- `list_vault_secrets`, `get_vault_secrets` — fetch required secrets

## Static Context (from bootstrap)

- **Stack**: Create React App (webpack 3 / babel 6, React 16); an Express server (`server/index.js`) serves the production `build/` output. Pinned to `node:16-bullseye-slim` for OpenSSL 1.1.1 compatibility with the legacy build toolchain.
- **Dockerfile**: `Dockerfile.codepress`
- **Port**: 3000
- **Validation**: `GET /` → status in [200, 301, 302, 404]
- **Services**: none
- **Required secrets**: none

## Step 1: Drift Check

Verify the recipe hasn't gone stale:

```bash
git hash-object Dockerfile.codepress   # compare to recipe.input_checksums.dockerfile
git hash-object package.json   # compare to recipe.input_checksums.dependency_manifest
```

If either checksum mismatches, the file has been edited since bootstrap. Proceed anyway — the agent will catch any actual breakage at build time — but flag the drift in your final report so the user knows the recipe may need updating.

## Step 2: Fetch Secrets

This app needs no vault secrets. Skip to Step 3.

## Step 3: Build and Start

```text
build_and_start_app_server(
  workspaceDir=<absolute path to repo root>,
  port=3000,
  dockerfilePath="Dockerfile.codepress",
  envVars={}
)
```

If retrying after a fix in the same session, pass `existingContainerId=<previous id>` so the old container is stopped on a successful rebuild. On the first attempt there is no previous container — omit the argument.

> **Build-context note (important).** The build proxy strips every directory named `node_modules` at any depth from the Docker context — including the app's source folder `src/node_modules`, which holds the `DotDotDotLoader` component (a legacy CRA module-resolution pattern). `Dockerfile.codepress` works around this by reconstructing `src/node_modules` from `lib/` (the committed, babel-compiled mirror with an identical file tree) before running `yarn build`. If you regenerate the Dockerfile, keep this step or the build will fail with `Can't resolve './node_modules/components/DotDotDotLoader/DotDotDotLoader'`.

## Step 4: Validate

If the tool returns `health_check: "ready"` → go to Step 5.

If it returns `health_check: "timed_out"`, poll up to 12 rounds × 5s each (60 seconds):

```text
for attempt in 1..12:
  r = forward_app_request(containerId, path="/", method="GET")
  if r.status in [200, 301, 302, 404]: break
  sleep 5
```

If the poll is about to exhaust without success, check `get_app_server_logs` once. If the logs show a still-progressing startup step (compiling assets, warming caches), extend with up to another 12 rounds before giving up.

Success = any status in [200, 301, 302, 404]. A definite crash in the logs, or true exhaustion after extension, counts as failure and jumps to "Repair on Failure" below.

## Step 5: Report

Tell the user:

- Container ID: `<id>`
- Port: 3000
- How to hit it: `forward_app_request(containerId, path="...")`
- How to stop: `stop_app_server(containerId)`

If the user only asked to start / spin up the server, **STOP HERE**. Do not proceed to verification unless they asked to verify or test changes.

## Known Fixes (from bootstrap)

These issues came up during the initial bootstrap — try these first if a rebuild is needed:

- The repo's root `Dockerfile` copies a prebuilt `build/` directory that does not exist in the repo. `Dockerfile.codepress` runs `yarn build` inside the image instead.
- The legacy webpack 3 / babel 6 toolchain needs OpenSSL 1.1.1 — pin `node:16-bullseye-slim`. Newer Node throws `ERR_OSSL_EVP_UNSUPPORTED` during `yarn build`.
- The build context strips every `node_modules` directory at any depth, so `src/node_modules` (the component source) never arrives via COPY. `Dockerfile.codepress` reconstructs it from `lib/` (the committed babel-compiled mirror) before `yarn build`.

## Repair on Failure

If `build_and_start_app_server` returns a genuine build/start error (not just a health timeout):

**Before attempting repair, check `recipe.repair_count`.** If it is already at the `>= 3` ceiling, do not attempt in-session repair — at three or more prior repairs the recipe has stopped converging on the customer's actual repo state, and another rebuild would just consume more agent sessions without resolving the underlying drift. Tell the user the recipe is likely stale and suggest they re-invoke `/bootstrap-app-server` to regenerate it from scratch, then stop.

Otherwise:

1. Read `get_app_server_logs` AND the tool's error string in full
2. Match the error against the Known Fixes list above — apply that fix first if it matches
3. Identify ALL issues in the error output — do not rebuild after fixing just one
4. Edit `Dockerfile.codepress` (and, if needed, `recipe.json` for port/services changes)
5. Rebuild with `existingContainerId` set to the previous container's ID
6. If still failing after 3 in-session retries:
   - Bump `recipe.json.repair_count` by 1
   - Set `recipe.json.origin` to `"repair"`
   - Update `recipe.json.bootstrapped_at` to the current ISO timestamp
   - Recompute `input_checksums` for the files you changed
   - Append a one-line summary of what you fixed to `recipe.json.known_fixes`
   - Also append that line to the "Known Fixes" section above in this SKILL.md
   - Commit:
     ```bash
     git add Dockerfile.codepress .codepress/start-app-server/recipe.json .claude/skills/start-app-server/
     git commit -m "fix: update start-app-server recipe (repair attempt <N>)"
     ```
   - In ECS mode, also push: `git push origin HEAD`

If you can't get it running after all that, stop the container if one is up, tell the user what you tried, and leave the recipe unchanged.

## Cleanup

**Do NOT stop a successfully started container.** The caller (user or `app-server-verify` Step 0) delegated here to leave a live server they can hit with `forward_app_request`. Leave it running and just report the container ID.

Only call `stop_app_server(containerId)` when:

- The user explicitly asks to stop or tear down the server, OR
- A build/start attempt failed and left a dead container behind (stop that failed container so it doesn't leak), OR
- You started a container as part of verification and the user asked to clean up afterward
