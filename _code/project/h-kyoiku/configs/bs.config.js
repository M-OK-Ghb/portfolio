module.exports = {
  files: ['./build/**/*.html', './build/**/*.css', './build/**/*.js'],
  watch: true,
  server: {
    baseDir: 'build/chance/',
    index: 'index.html'
  },
  proxy: false,
  port: 3000,
  open: "external",
};