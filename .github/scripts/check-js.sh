#!/usr/bin/env bash
# Checks the JavaScript files changed between BASE and HEAD:
#   1. Syntax: every changed file must parse (node --check).
#   2. Lint (ESLint, see eslint.config.mjs): a changed file may not have more errors
#      than it had on the base branch. Errors that were already there are reported as
#      notices but don't fail the check, so editing an old file isn't blocked by
#      problems you didn't introduce. New files must have no errors. A renamed file is
#      compared with its contents under the old name.
# Any failure of git, Node, or ESLint itself fails the check rather than passing silently.
#
# Usage: BASE=<git ref> .github/scripts/check-js.sh
# Run from the repository root, with eslint and globals installed in node_modules.
set -uo pipefail

BASE="${BASE:?Set BASE to the git ref to compare against, for example origin/master}"
ESLINT="node_modules/.bin/eslint"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

if [ ! -x "$ESLINT" ]; then
  echo "::error::ESLint is not installed at $ESLINT"
  exit 1
fi

# List changed files with rename detection. Checked separately so a failed
# comparison (for example an unknown BASE) fails the check instead of looking
# like "nothing changed".
if ! git diff --name-status -z -M --diff-filter=ACMR "$BASE...HEAD" -- '*.js' > "$tmp/diff" 2> "$tmp/diff-error"; then
  echo "::error::Could not compare with $BASE"
  cat "$tmp/diff-error"
  exit 1
fi

# Records are NUL-separated: "<status>\0<path>\0", or for renames and copies
# "<R|C><score>\0<old path>\0<new path>\0". base_path is where the file's base
# version lives (empty for new files).
changed=()
base_paths=()
while IFS= read -r -d '' status; do
  case "$status" in
    R*|C*)
      IFS= read -r -d '' old_path
      IFS= read -r -d '' new_path
      changed+=("$new_path")
      base_paths+=("$old_path")
      ;;
    A)
      IFS= read -r -d '' path
      changed+=("$path")
      base_paths+=("")
      ;;
    *)
      IFS= read -r -d '' path
      changed+=("$path")
      base_paths+=("$path")
      ;;
  esac
done < "$tmp/diff"

if [ "${#changed[@]}" -eq 0 ]; then
  echo "No JavaScript files changed."
  exit 0
fi

# Runs ESLint with the given arguments and prints the number of errors.
# ESLint exits 0 (no errors) or 1 (lint errors) with a JSON report; anything else,
# or output that isn't a JSON report, is a failure of ESLint itself and returns 1.
lint_error_count() {
  local exit_code=0
  "$ESLINT" --no-warn-ignored -f json "$@" > "$tmp/report.json" 2> "$tmp/eslint-error" || exit_code=$?
  if [ "$exit_code" -ne 0 ] && [ "$exit_code" -ne 1 ]; then
    cat "$tmp/eslint-error" >&2
    return 1
  fi
  node -e '
    const report = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    if (!Array.isArray(report)) throw new Error("ESLint report is not an array");
    console.log(report.reduce((n, file) => n + file.errorCount, 0));
  ' "$tmp/report.json"
}

echo "Checking ${#changed[@]} changed JavaScript file(s) against $BASE"
status=0

for i in "${!changed[@]}"; do
  file="${changed[$i]}"
  base_path="${base_paths[$i]}"

  # 1. Syntax
  if ! node --check "$file" 2> "$tmp/syntax-error"; then
    echo "::error file=$file::Syntax error"
    cat "$tmp/syntax-error"
    status=1
    continue
  fi

  # 2. Lint the current file, then the base version (linted under the current
  #    file name so the same configuration applies)
  if ! head_errors=$(lint_error_count "$file"); then
    echo "::error file=$file::ESLint failed to run"
    status=1
    continue
  fi

  base_errors=0
  if [ -n "$base_path" ]; then
    if ! git show "$BASE:$base_path" > "$tmp/base.js" 2> "$tmp/show-error"; then
      echo "::error file=$file::Could not read $base_path from $BASE"
      cat "$tmp/show-error"
      status=1
      continue
    fi
    if ! base_errors=$(lint_error_count --stdin --stdin-filename "$file" < "$tmp/base.js"); then
      echo "::error file=$file::ESLint failed to run on the $BASE version"
      status=1
      continue
    fi
  fi

  if [ "$head_errors" -gt "$base_errors" ]; then
    echo "::error file=$file::ESLint errors went from $base_errors to $head_errors"
    "$ESLINT" --no-warn-ignored "$file"
    status=1
  elif [ "$head_errors" -gt 0 ]; then
    echo "::notice file=$file::$head_errors existing ESLint error(s), not introduced by this change (was $base_errors)"
  else
    echo "ok: $file"
  fi
done

exit $status
