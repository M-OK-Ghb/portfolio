'use strict';

// ----------------------------------------------------------------------------------------------------
// パッケージの読み込み
// ----------------------------------------------------------------------------------------------------
// const cached = require('gulp-cached');
// const plumber = require('gulp-plumber');

const gulp = require("gulp");
const gulpIf = require("gulp-if");
const typescript = require('gulp-typescript');
// const changed = require("gulp-changed");
// const uglify = require("gulp-uglify");
const utils = require("../../utils");

// ----------------------------------------------------------------------------------------------------
// 設定ファイルの読み込み
// ----------------------------------------------------------------------------------------------------
const taskName = require("../configs/task-name.config");
const dir = require("../configs/dir.config");
const config = require("../configs/ts.config");

//--------------------------------------------------------------------------------
// タスクの定義
//--------------------------------------------------------------------------------
const execute = async mode => {
  console.time("ts");
  const tsProject = typescript.createProject('tsconfig.json');
  await Promise.all(
    config.entries.map(async entry => {
      await utils.transformPromise(
        gulp
          .src(entry.src)
          .pipe(tsProject())
          .pipe(
            gulp.dest(
              `${dir.src}${entry.dest}`
            )
          )
      );
    })
  );

  console.timeEnd("ts");
};


// ----------------------------------------------------------------------------------------------------
// タスクの登録
// ----------------------------------------------------------------------------------------------------
gulp.task(taskName.ts.build, async () => {
  await execute(utils.mode.BUILD);
});

gulp.task(taskName.ts.release, async () => {
  await execute(utils.mode.RELEASE);
});

module.exports = execute;