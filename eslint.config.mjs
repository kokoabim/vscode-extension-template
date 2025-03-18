import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [{
    files: ["**/*.ts"],
}, {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/naming-convention": ["warn", {
            selector: "import",
            format: ["camelCase", "PascalCase"],
        }],
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "curly": [
            "warn",
            "multi-line"
        ],
        "eqeqeq": "warn",
        "no-throw-literal": "warn",
        "no-unreachable": "warn",
        "no-unused-expressions": "warn",
        "semi": "warn",
    },
}];