"use strict";

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");

//--------------------------------------------------------------------------------
// 設定のエクスポート
//--------------------------------------------------------------------------------
module.exports = {
  php: [`${dir.src}${dir.php}**/*.php`],
  html: [`${dir.src}${dir.html}**/*.+(html|ejs)`],
  sass: [`${dir.src}${dir.sass}**/*.scss`],
  webpack: [`${dir.src}${dir.ts}**/*.ts`],
  // ts: [`${dir.src}${dir.ts}**/*.ts`],
  // js: [`${dir.src}${dir.js}**/*.js`],
  image: [`${dir.src}${dir.img}**/*.+(jpg|png|gif|svg)`],
  copy: [`${dir.src}${dir.icon}**/*`]
};
