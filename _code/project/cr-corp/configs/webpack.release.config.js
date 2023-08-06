"use strict";

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

module.exports = webpackMerge.merge(baseConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../release/js"),
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
