#!/usr/bin/env bash
# PostToolUse hook: run `npm run typecheck` after edits to TypeScript code in
# this repo. Wired in `.claude/settings.json` with matcher `Edit|Write|MultiEdit`.
#
# Why this exists: CLAUDE.md § Commits requires typecheck before committing
# changes touching `app/`, `content/`, or `next.config.mjs`. Per the canonical
# D3.3 quiz answer in `content/d3-claude-code.mdx`, prose-only enforcement is
# the wrong answer; the right answer is a PostToolUse hook. This is that hook.
#
# Why not also content/**.mdx: tsc --noEmit doesn't semantically validate MDX.
# Including MDX paths here would create a false sense of safety. The build-time
# gate (Phase 5 of docs/improvement-loop.md) stays as the MDX validator.

set -euo pipefail

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

if [ -z "$file_path" ]; then
  exit 0
fi

repo_root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
rel_path="${file_path#"$repo_root"/}"

if ! printf '%s' "$rel_path" | grep -qE '^(app/.+\.(ts|tsx)|next\.config\.mjs|mdx-components\.tsx)$'; then
  exit 0
fi

log=/tmp/typecheck-hook.log
cd "$repo_root"
if ! npm run --silent typecheck > "$log" 2>&1; then
  {
    printf 'typecheck failed after editing %s\n' "$rel_path"
    printf 'Tail of %s:\n' "$log"
    tail -20 "$log"
  } >&2
  exit 2
fi
