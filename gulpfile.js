var gulp = require('gulp'),
    express=require('express');
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify');
    spawn = require('child_process').spawn,
    livereload = require('gulp-livereload');

var paths = {
    sassSource: 'assets/scss/*.scss',
    cssDestination: './assets/css/'
};

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = '_site/'


// Run Jekyll Build Asynchronously
gulp.task('jekyll', function () {
    var jekyll = spawn('jekyll', ['build']);

    jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --')
    })
});


gulp.task('styles', function() {
    return gulp.src(paths.sassSource)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(notify('Styles Processed!'))
        .pipe(gulp.dest(paths.cssDestination))
        .pipe(gulp.dest('_site/assets/css')); // Copy to static dir
});


// Run static file server
gulp.task('serve', function () {
    var server = express();
    server.use(express.static(EXPRESS_ROOT));
    server.listen(EXPRESS_PORT);
});

// Watch for changes
gulp.task('watch', function () {
    var lr = livereload();

    // Manually compile and inject css to avoid jekyll overhead, and utilize livereload injection
    gulp.watch('assets/_scss/*.scss', ['sass:dev']);
    
    // Watch for changes to other files for jekyll compilation
    // Note: This will probably need to be updated with the files you want to watch
    // Second Note: MAKE SURE that the last to items in the watchlist are included or else infinite jekyll loop
    gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll']);

    // When a file in the _site directory changes, tell livereload to reload the page
    gulp.watch(['_site/*/**']).on('change', function (file) {
        lr.changed(file.path);
    });
})


gulp.task('default', ['styles', 'jekyll', 'serve', 'watch']);