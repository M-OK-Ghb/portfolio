"use strict";

const path = require("path");
const base = path.resolve();
const _mode = {
  DEV: "dev",
  BUILD: "build",
  RELEASE: "release"
};

exports.isDev = mode => {
  return mode === _mode.DEV;
};

exports.isBuild = mode => {
  return mode === _mode.BUILD;
};

exports.isRelease = mode => {
  return mode === _mode.RELEASE;
};

exports.resolve = dir => {
  return path.join(base, dir);
};

exports.transformPromise = stream => {
  return new Promise(resolve => {
    stream.on(stream._events.finish ? "finish" : "end", () => {
      resolve(stream);
    });
  });
};

exports.wait = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

exports.base = base;
exports.mode = _mode;
