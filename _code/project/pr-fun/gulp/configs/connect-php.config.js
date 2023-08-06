"use strict";

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");

module.exports = {
  port: 3000,
  base: dir.build,
  bin: '/usr/local/opt/php@7.1/bin/php',
  ini: '/usr/local/etc/php/7.1/php.ini'
};
