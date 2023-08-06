"use strict";

module.exports = {
  dev: "default",
  build: "build",
  release: "release",
  browserSync: "server",
  watch: "watch",
  sprite: "sprite",
  html: {
    build: "html",
    release: "html:release"
  },
  php: {
    build: "php",
    release: "php:release"
  },
  sass: {
    build: "sass",
    release: "sass:release"
  },
  webpack: {
    build: "webpack",
    release: "webpack:release"
  },
  ts: {
    build: "ts",
    release: "ts:release"
  },
  js: {
    build: "js",
    release: "js:release"
  },
  image: {
    build: "image",
    release: "image:release"
  },
  concat: {
    build: "concat",
    release: "concat:release"
  },
  copy: {
    build: "copy",
    release: "copy:release"
  },
  clean: {
    build: "clean",
    release: "clean:release"
  }
};
