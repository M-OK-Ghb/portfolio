"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const svgo = require("imagemin-svgo");
const gifsicle = require("imagemin-gifsicle");
const utils = require("../../utils");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/image.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("image");

  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(gulpIf(utils.isDev(mode), changed(`${dir.build}${entry.dest}`)))
          .pipe(
            gulpIf(
              utils.isRelease(mode),
              imagemin([
                mozjpeg(entry.jpgConfig),
                pngquant(entry.pngConfig),
                svgo({ plugins: entry.svgConfig }),
                gifsicle(entry.gifConfig)
              ])
            )
          )
          .pipe(
            gulp.dest(
              `${utils.isRelease(mode) ? dir.release : dir.build}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("image");
};

//--------------------------------------------------------------------------------
// タスクの登録
//--------------------------------------------------------------------------------
gulp.task(taskName.image.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.image.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;
