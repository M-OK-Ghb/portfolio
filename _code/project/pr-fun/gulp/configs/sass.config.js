"use strict";

//--------------------------------------------------------------------------------
// パッケージの読み込み
//--------------------------------------------------------------------------------
const notify = require("gulp-notify");

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");

//--------------------------------------------------------------------------------
// 設定のエクスポート
//--------------------------------------------------------------------------------
module.exports = {
  entries: [
    {
      // 対象ファイル
      src: [`${dir.src}${dir.sass}runfiles/**/*.scss`],
      // 出力先（build/releaseディレクトリは自動的に付与するので不要）
      dest: "",
      // gulp-sassの設定（詳細：https://github.com/sass/node-sass#options）
      sassConfig: {
        outputStyle: "expanded"
      },
      // gulp-autoprefixerの設定（詳細：https://github.com/postcss/autoprefixer#options）
      autoprefixerConfig: {
        overrideBrowserslist: ["last 2 versions", "ie >= 10", "iOS >= 9", "Android >= 5"],
        grid: true
      },
      // gulp-cssoの設定（詳細：https://github.com/ben-eb/gulp-csso#api）
      cssoConfig: {
        restructure: true
      }
    }
  ],
  // plumberの設定（詳細：https://github.com/floatdrop/gulp-plumber#api-monkey）
  plumberConfig: {
    // notifyの設定（詳細：https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults）
    errorHandler: notify.onError({
      title: "Sass Compile Error",
      message: "Error: <%= error.message %>",
      sound: false,
      timeout: 2
    })
  }
};
