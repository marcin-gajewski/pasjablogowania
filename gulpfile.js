var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var open = require('gulp-open');
var connect = require('gulp-connect');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');


// our compile project is in build folder and this is our root we want to see in browser
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});
// open browser
gulp.task('open', ['connect'], function () {
    gulp.src('./dist/index.html')
        .pipe(open({
            uri: 'http://localhost:8080',
            app: 'firefox'
        }));
});

// keeps gulp from crashing for scss errors
// compile sass files from source. Add vendor prefix and save in build
gulp.task('sass', function () {
    var onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
        })(err);

        this.emit('end');
    };


    return gulp.src('./source/assets/sass/**/*.sass')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('./dist/assets/css'))
});

// compile jade files into html
gulp.task('jade', function () {
    var onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
        })(err);

        this.emit('end');
    };

    return gulp.src('./source/*.jade')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jade({
            pretty: true
        })) // pip to jade plugin
        .pipe(gulp.dest('./dist/')) // tell gulp our output folder

});

// copy images and js
gulp.task('copy', function () {
    gulp.src('./source/assets/js/**/*', {
            base: './source/assets/js'
        })
        .pipe(gulp.dest('./dist/assets/js/'));
    gulp.src('./source/assets/img/**/*', {
            base: './source/assets/img'
        })
        .pipe(gulp.dest('./dist/assets/img/'));
});


gulp.task('livereload', function () {
    gulp.src('./dist/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./source/assets/sass/**/*.sass', ['sass']);
    gulp.watch('./source/*.jade', ['jade']);
    gulp.watch('./dist/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'open', 'watch', 'sass', 'jade', 'copy']);