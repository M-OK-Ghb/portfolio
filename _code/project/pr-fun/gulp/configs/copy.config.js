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
      src: [`${dir.src}${dir.icon}**/*`],
      // 出力先（build/releaseディレクトリは自動的に付与するので不要）
      dest: ""
    },
    {
      // 対象ファイル
      src: [`${dir.src}${dir.fonts}**/*`],
      // 出力先（build/releaseディレクトリは自動的に付与するので不要）
      dest: "fonts"
    }
  ]
};
