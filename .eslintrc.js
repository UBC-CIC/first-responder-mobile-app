module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-use-before-define": "off",
    quotes: ["warn", "double"],
    "react/no-array-index-key": "off",
    "no-unused-vars": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/no-unresolved": "warn",
    "import/extensions": ["warn", "never"],
    "react/require-default-props": "off",
    "react/no-unused-prop-types": "warn",
    "react/jsx-props-no-spreading": "off",
    "prefer-const": "warn",
    indent: ["error", 2],
    "no-plusplus": "off",
    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": "warn",
    "react/no-unescaped-entities": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "global-require": "off",
    "max-len": "off",
    camelcase: "off",
    "import/no-extraneous-dependencies": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
