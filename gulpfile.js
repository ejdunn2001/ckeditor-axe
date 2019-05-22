let gulp = require("gulp");
let babel = require("gulp-babel");

function defaultTask(cb) {
  cb();
}

function js() {
  // @TODO: JS minification functionality.
  return gulp
    .src(["node_modules/babel-polyfill/dist/polyfill.js", "src/*.js"], {
      sourcemaps: true
    })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest("dist", { sourcemaps: true }));
}

// noinspection JSUnresolvedVariable
exports.js = js;
// noinspection JSUnresolvedVariable
exports.default = gulp.parallel(defaultTask, js);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJndWxwZmlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IHNyYywgZGVzdCB9ID0gcmVxdWlyZShcImd1bHBcIik7XG4vLyBjb25zdCBjb25jYXQgPSByZXF1aXJlKFwiZ3VscC1jb25jYXRcIik7XG5cbmZ1bmN0aW9uIGRlZmF1bHRUYXNrKGNiKSB7XG4gIGNiKCk7XG59XG5cbmZ1bmN0aW9uIGpzKCkge1xuICByZXR1cm4gc3JjKFwiLi8qLmpzXCIsIHsgc291cmNlbWFwczogdHJ1ZSB9KS5waXBlKGRlc3QoJy4vJywgeyBzb3VyY2VtYXBzOiB0cnVlIH0pKTtcbiAgLy8gLnBpcGUoY29uY2F0KCdhcHAubWluLmpzJykpXG59XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdFRhc2s7XG4vLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcbmV4cG9ydHMuanMgPSBqcztcbiJdLCJmaWxlIjoiZ3VscGZpbGUuanMifQ==
