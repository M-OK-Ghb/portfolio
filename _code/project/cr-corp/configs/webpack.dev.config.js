"use strict";

const webpackMerge = require("webpack-merge");
const buildConfig = require("./webpack.build.config");

module.exports = webpackMerge.merge(buildConfig, {
  watch: true
});
