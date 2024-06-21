module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect", // detect react version
    },
  },
  env: {
    node: true, // defines things like process.env when generating through node
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-anonymous-exports-page-templates": "warn",
    "limited-exports-page-templates": "warn",
  },
}
