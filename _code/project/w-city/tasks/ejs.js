"use strict";

const fs = require("fs");
const path = require("path");
const ejs = require('ejs');
const glob = require("glob");
const makeDir = require("make-dir");
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'mode',
    alias: 'm',
    type: String,
    defaultValue: 'build'
  }
];
const options = commandLineArgs(optionDefinitions);

const srcDir = `${process.cwd()}/src/ejs`;
const distDir = `${process.cwd()}/` + options.mode;

glob(
  `**/*.ejs`,
  {
    cwd: srcDir,
    ignore: [
      `_**/*.ejs`,
      `*/_**/*.ejs`
    ]
  },
  (er, files) => {
    for (let fileName of files) {
      convert(fileName, srcDir, distDir);
    }
  }
);

const convert = (fileName, srcDir, distDir) => {
  ejs.renderFile(path.resolve(srcDir, fileName), (err, str) => {
    if (err) {
      console.log(err);
      return;
    }

    const distPath = path.resolve(distDir, fileName);
    makeDir(path.dirname(distPath)).then(() => {
      const htmlPath = path.format({
        dir: path.dirname(distPath),
        name: path.basename(distPath, ".ejs"),
        ext: ".html",
      });
      fs.writeFile(htmlPath, str, () => {});
    });
  });
};