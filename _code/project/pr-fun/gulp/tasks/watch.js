"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const watch = require("gulp-watch");
const browserSync = require("browser-sync");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const config = require("../configs/watch.config");

//--------------------------------------------------------------------------------
// タスクの読み込み
//--------------------------------------------------------------------------------
const php = require("./php");
const html = require("./html");
const sass = require("./sass");
const webpack = require("./webpack");
// const ts = require("./ts");
// const js = require("./js");
const image = require("./image");
const copy = require("./copy");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = () => {
  const events = ["change", "add", "unlink"];
  let progressPhp = false;
  let progressHtml = false;
  let progressSass = false;
  let progressWebpack = false;
  // let progressTs = false;
  // let progressJs = false;
  let progressImage = false;
  let progressCopy = false;

  watch(config.php, { events }, async () => {
    if (progressPhp) {
      return;
    }
    progressPhp = true;
    await php(utils.mode.DEV);
    browserSync.reload();
    progressPhp = false;
  });

  watch(config.html, { events }, async () => {
    if (progressHtml) {
      return;
    }
    progressHtml = true;
    await html(utils.mode.DEV);
    browserSync.reload();
    progressHtml = false;
  });

  watch(config.sass, { events }, async () => {
    if (progressSass) {
      return;
    }
    progressSass = true;
    await utils.wait(250);
    await sass(utils.mode.DEV);
    browserSync.reload();
    progressSass = false;
  });

  watch(config.webpack, { events }, async () => {
    if (progressWebpack) {
      return;
    }
    progressWebpack = true;
    await webpack(utils.mode.DEV);
    browserSync.reload();
    progressWebpack = false;
  });

  // watch(config.ts, { events }, async () => {
  //   if (progressTs) {
  //     return;
  //   }
  //   progressTs = true;
  //   await ts(utils.mode.DEV);
  //   progressTs = false;
  // });

  // watch(config.js, { events }, async () => {
  //   if (progressJs) {
  //     return;
  //   }
  //   progressJs = true;
  //   await js(utils.mode.DEV);
  //   browserSync.reload();
  //   progressJs = false;
  // });

  watch(config.image, { events }, async () => {
    if (progressImage) {
      return;
    }
    progressImage = true;
    await image(utils.mode.DEV);
    browserSync.reload();
    progressImage = false;
  });

  watch(config.copy, { events }, async () => {
    if (progressCopy) {
      return;
    }
    progressCopy = true;
    await copy(utils.mode.DEV);
    browserSync.reload();
    progressCopy = false;
  });
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.watch, execute);

module.exports = execute;
