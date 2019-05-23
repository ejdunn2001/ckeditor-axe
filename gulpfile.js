const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const src = gulp.src;
const dest = gulp.dest;

gulp.task("default", function() {
  // Functionality of "babel-poly" is needed to make everything better!
  // @see: https://babeljs.io/docs/en/6.26.3/babel-polyfill
  // @see: https://github.com/babel/gulp-babel/issues/27
  src("node_modules/babel-polyfill/dist/polyfill.js");
  // Now we are going to minify and convert scripts syntax to be compatible with ECMAScript 5.
  return gulp
    .src("src/*.js") // <- take source code.
    .pipe(babel()) // <- ECMAScript 5.
    .pipe(dest("axe")) // <- output not minified files.
    .pipe(uglify()) // <- minify what we have.
    .pipe(rename({ extname: ".min.js" })) // <- rename to "min.js".
    .pipe(dest("axe")); // <- output minified files.
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJndWxwZmlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IHNyYywgZGVzdCB9ID0gcmVxdWlyZShcImd1bHBcIik7XG4vLyBjb25zdCBjb25jYXQgPSByZXF1aXJlKFwiZ3VscC1jb25jYXRcIik7XG5cbmZ1bmN0aW9uIGRlZmF1bHRUYXNrKGNiKSB7XG4gIGNiKCk7XG59XG5cbmZ1bmN0aW9uIGpzKCkge1xuICByZXR1cm4gc3JjKFwiLi8qLmpzXCIsIHsgc291cmNlbWFwczogdHJ1ZSB9KS5waXBlKGRlc3QoJy4vJywgeyBzb3VyY2VtYXBzOiB0cnVlIH0pKTtcbiAgLy8gLnBpcGUoY29uY2F0KCdhcHAubWluLmpzJykpXG59XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdFRhc2s7XG4vLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcbmV4cG9ydHMuanMgPSBqcztcbiJdLCJmaWxlIjoiZ3VscGZpbGUuanMifQ==
