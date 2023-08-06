"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const changed = require("gulp-changed");
const uglify = require("gulp-uglify");
const utils = require("../../utils");

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
  console.time("js");

  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(gulpIf(utils.isDev(mode), changed(`${dir.build}${entry.dest}`)))
          .pipe(gulpIf(utils.isRelease(mode), uglify(entry.uglifyConfig)))
          .pipe(
            gulp.dest(
              `${utils.isRelease(mode) ? dir.release : dir.build}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("js");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.js.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.js.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
