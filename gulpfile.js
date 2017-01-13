
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var jsFiles = 'assets/map.js';
var jsDest  = 'assets/'
gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(rename('map.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
