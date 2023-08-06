"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/sass.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("sass");

  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(gulpIf(utils.isDev(mode), plumber(config.plumberConfig)))
          .pipe(gulpIf(!utils.isRelease(mode), sourcemaps.init()))
          .pipe(sass(entry.sassConfig))
          .pipe(autoprefixer(entry.autoprefixerConfig))
          .pipe(gulpIf(!utils.isRelease(mode), sourcemaps.write(".")))
          .pipe(gulpIf(utils.isRelease(mode), gcmq()))
          .pipe(gulpIf(utils.isRelease(mode), csso(entry.cssoConfig)))
          .pipe(
            gulp.dest(
              `${utils.isRelease(mode) ? dir.release : dir.build}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("sass");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.sass.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.sass.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
