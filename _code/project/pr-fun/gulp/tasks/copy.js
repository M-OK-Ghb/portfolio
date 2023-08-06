"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const changed = require("gulp-changed");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/copy.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("copy");

  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(gulpIf(utils.isDev(mode), changed(`${dir.build}${entry.dest}`)))
          .pipe(
            gulp.dest(
              `${utils.isRelease(mode) ? dir.release : dir.build}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("copy");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.copy.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.copy.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
