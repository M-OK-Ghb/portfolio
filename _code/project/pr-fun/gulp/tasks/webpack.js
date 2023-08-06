"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const plumber = require('gulp-plumber');

const utils = require("../../utils");
// webpackの設定ファイルの読み込み
const webpackBuildConfig = require("../configs/webpack.build.config");
const webpackReleaseConfig = require("../configs/webpack.release.config");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/js.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("webpack");

  await utils.transformPromise(
    gulp
      .src(utils.isRelease(mode) ? webpackReleaseConfig.entry : webpackBuildConfig.entry)
      .pipe(plumber())
      .pipe(
        webpackStream(
          utils.isRelease(mode) ?
            webpackReleaseConfig :
            webpackBuildConfig,
          webpack)
      ).pipe(
        gulp.dest(
          (utils.isRelease(mode) ? webpackReleaseConfig : webpackBuildConfig).output.path
        )
      )
  )


  console.timeEnd("webpack");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.webpack.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.webpack.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
