"use strict";

const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

module.exports = webpackMerge.merge(baseConfig, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../build/js"),
  },
  devtool: "source-map",
});
