// ESLint configuration for the pull request check in .github/workflows/check-js.yml.
// Only files changed in a pull request are linted, so existing code isn't held to this
// until someone edits it.
import globals from "globals";

// Names available to snippets that run in the browser, inside Pendo
const snippetGlobals = {
  ...globals.browser,
  // Provided by the Pendo agent and by guide Custom Code Blocks
  pendo: "readonly",
  step: "readonly",
  guide: "readonly",
  // Provided by the legacy Guide Center code wrapper
  dom: "readonly",
};

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
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
    },
    rules: {
      // Catches typos and accidental globals (assigning to an undeclared variable)
      "no-undef": "error",
    },
  },
  {
    // Snippets: browser and Pendo globals (command-line scripts are excluded, since
    // globals from matching config entries are merged)
    files: ["**/*.js"],
    ignores: ["scripts/**"],
    languageOptions: {
      globals: snippetGlobals,
    },
  },
  {
    // Command-line scripts run in Node.js only
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Has both a browser part (run after the Pendo snippet) and a Node.js part
    files: ["other/decode-jzb.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
