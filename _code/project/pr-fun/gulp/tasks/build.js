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
gulp.task(taskName.build, async () => {
  await clean(utils.mode.BUILD);
  await Promise.all([
    // php(utils.mode.BUILD),
    html(utils.mode.BUILD),
    sass(utils.mode.BUILD),
    webpack(utils.mode.BUILD),
    // ts(utils.mode.BUILD),
    // js(utils.mode.BUILD),
    image(utils.mode.BUILD),
    concat(utils.mode.BUILD),
    copy(utils.mode.BUILD)
  ]);
});
