//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");

const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const path = require('path');

module.exports = merge(base, {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  devtool: 'source-map',
  // 出力ファイル
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve( `${dir.build}${dir.js}`),
  }
});