"use strict";

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
      src: [`${dir.src}${dir.img}**/!(_)*.+(jpg|png|gif|svg)`],
      // 出力先（build/releaseディレクトリは自動的に付与するので不要）
      dest: dir.img,
      // imagemin-mozjpegの設定（詳細：https://github.com/imagemin/imagemin-mozjpeg#options）
      jpgConfig: {
        quality: 80
      },
      // imagemin-pngquantの設定（詳細：https://github.com/imagemin/imagemin-pngquant#options）
      pngConfig: {
        quality: [0.8,0.9],
        speed: 3
      },
      // imagemin-svgoの設定（詳細：https://github.com/svg/svgo#what-it-can-do）
      svgConfig: [{ removeDimensions: true }, { removeViewBox: false }],
      // imagemin-gifsicleの設定（詳細：https://github.com/imagemin/imagemin-gifsicle#options）
      gifConfig: {
        optimizationLevel: 3,
        colors: 256
      }
    }
  ]
};
