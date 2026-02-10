import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // 1. GLOBAL RULES (Production Code)
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/*/components/*",
                "@/features/*/hooks/*",
                "@/features/*/services/*",
                "@/features/*/types",
              ],
              message: "❌ Deep imports from features are forbidden. Import from the feature's index.ts barrel: import { X } from '@/features/autosuggest'",
            },
            {
              group: [
                "../features/*/components/*",
                "../features/*/hooks/*",
                "../features/*/services/*",
                "../../features/*/components/*",
                "../../features/*/hooks/*",
                "../../features/*/services/*",
              ],
              message: "❌ Deep imports from features are forbidden. Import from the feature's index.ts barrel.",
            },
            {
              group: [
                "../*/components/*",
                "../*/hooks/*",
                "../*/services/*",
                "../*/types",
                "../*/types.ts",
              ],
              message: "❌ Cross-feature imports must use the barrel: import { X } from '@/features/otherFeature'",
            },
          ],
        },
      ],
    },
  },

  // 2. OVERRIDE FOR TESTS
  // This says: "If the file is in __tests__, ignore the restricted-imports rule"
  {
    files: ["**/__tests__/**/*", "**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },

  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
]);