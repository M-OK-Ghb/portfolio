"use strict";

//--------------------------------------------------------------------------------
// 設定ファイルの読み込み
//--------------------------------------------------------------------------------
const dir = require("../configs/dir.config");

//--------------------------------------------------------------------------------
// 設定のエクスポート
//--------------------------------------------------------------------------------

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/ts/app.ts",
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: [
          // 下から順に処理される
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              // tslint時に自動的に修正しない
              fix: false,
              // warningをエラーにすることでその後のビルドを止める
              emitErrors: true
            },
          },
        ],
        exclude: /(node_modules|client)/
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.ts']
  },
  // 出力ファイル
  output: {
    // 出力ファイル名
    filename: "main.js"
  }
}