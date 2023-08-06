"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const del = require("del");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");
const taskName = require("../configs/task-name.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("clean");
  await del(utils.isRelease(mode) ? dir.release : dir.build);
  console.timeEnd("clean");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.clean.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.clean.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
