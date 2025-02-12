import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("airbnb-base"),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },

    rules: {
      quotes: ["error", "double"],
      "no-underscore-dangle": [
        "error",
        {
          allow: ["_id"],
        },
      ],

      "no-console": "off",
      "linebreak-style": 0,
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },
];
