"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");

//--------------------------------------------------------------------------------
// タスクの読み込み
//--------------------------------------------------------------------------------
const clean = require("./clean");
const php = require("./php");
const html = require("./html");
const sass = require("./sass");
const webpack = require("./webpack");
const ts = require("./ts");
const js = require("./js");
const image = require("./image");
const concat = require("./concat");
const copy = require("./copy");

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.release, async () => {
  await clean(utils.mode.RELEASE);
  await Promise.all([
    // php(utils.mode.RELEASE),
    html(utils.mode.RELEASE),
    sass(utils.mode.RELEASE),
    webpack(utils.mode.RELEASE),
    // ts(utils.mode.RELEASE),
    // js(utils.mode.RELEASE),
    image(utils.mode.RELEASE),
    // concat(utils.mode.RELEASE),
    copy(utils.mode.RELEASE)
  ]);
});
