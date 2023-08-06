"use strict";

const path = require("path");
const base = path.resolve();

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: "./src/ts/app.ts",
  output: {
    filename: "[name].js",
  },
  target: ['web', 'es5'],
  node: {
    __dirname: false,
    __filename: false
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true
            },
          },
        ],
        exclude: /(node_modules|client)/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts"],
    alias: {
      "@": "src/ts",
    },
    fallback: {
      "querystring": false
    }
  },
  externals: {},
  plugins: [],
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    },
  },
  stats: 'errors-only',
};
