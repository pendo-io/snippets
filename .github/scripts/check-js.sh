#!/usr/bin/env bash
# Checks the JavaScript files changed between BASE and HEAD:
#   1. Syntax: every changed file must parse (node --check).
#   2. Lint (ESLint, see eslint.config.mjs): a changed file may not have more errors
#      than it had on the base branch. Errors that were already there are reported as
#      notices but don't fail the check, so editing an old file isn't blocked by
#      problems you didn't introduce. New files must have no errors.
#
# Usage: BASE=<git ref> .github/scripts/check-js.sh
# Run from the repository root, with eslint and globals installed in node_modules.
set -uo pipefail

BASE="${BASE:?Set BASE to the git ref to compare against, for example origin/master}"
ESLINT="node_modules/.bin/eslint"

# Count ESLint errors in the JSON report read from stdin
count_errors() {
  node -e 'let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    const report = s.trim() ? JSON.parse(s) : [];
    console.log(report.reduce((n, file) => n + file.errorCount, 0));
  });'
}

changed=()
while IFS= read -r -d '' file; do
  changed+=("$file")
done < <(git diff --name-only -z --diff-filter=ACMR "$BASE...HEAD" -- '*.js')

if [ "${#changed[@]}" -eq 0 ]; then
  echo "No JavaScript files changed."
  exit 0
fi

echo "Checking ${#changed[@]} changed JavaScript file(s) against $BASE"
status=0

for file in "${changed[@]}"; do
  # 1. Syntax
  if ! node --check "$file" 2> syntax-error.txt; then
    echo "::error file=$file::Syntax error"
    cat syntax-error.txt
    status=1
    continue
  fi

  # 2. Lint, compared with the base version of the same file
  head_errors=$("$ESLINT" --no-warn-ignored -f json "$file" 2>/dev/null | count_errors)
  if git cat-file -e "$BASE:$file" 2>/dev/null; then
    base_errors=$(git show "$BASE:$file" | "$ESLINT" --no-warn-ignored -f json --stdin --stdin-filename "$file" 2>/dev/null | count_errors)
  else
    base_errors=0
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

rm -f syntax-error.txt
exit $status
