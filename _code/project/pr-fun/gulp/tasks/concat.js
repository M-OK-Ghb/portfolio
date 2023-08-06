"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const concat = require("gulp-concat");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/concat.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("concat");

  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(concat(entry.out))
          .pipe(
            gulp.dest(
              `${utils.isRelease(mode) ? dir.release : dir.build}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("concat");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.concat.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.concat.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
