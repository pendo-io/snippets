// ESLint configuration for the pull request check in .github/workflows/check-js.yml.
// Only files changed in a pull request are linted, so existing code isn't held to this
// until someone edits it.
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/zz_deprecated/**",
      // Specs for Pendo's internal agent test setup; they can't run in this repo
      "other/test/**",
    ],
  },
  {
    // Snippets run in the browser, inside Pendo
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        // Provided by the Pendo agent and by guide Custom Code Blocks
        pendo: "readonly",
        step: "readonly",
        guide: "readonly",
        // Provided by the legacy Guide Center code wrapper
        dom: "readonly",
      },
    },
    rules: {
      // Catches typos and accidental globals (assigning to an undeclared variable)
      "no-undef": "error",
    },
  },
  {
    // Command-line scripts run in Node.js
    files: ["scripts/**/*.js", "other/decode-jzb.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
