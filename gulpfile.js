var gulp = require('gulp'),
    sass = require('gulp-sass'),
    colors = require('colors'),
    fs = require('fs'),
    path = require('path'),
    yargs = require('yargs').argv,
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// Read project directory and port from parameter(s) 
// Example: gulp -d "Example project-main" -p 8080
var projectDirectory = yargs.d !== undefined ? yargs.d : 'No project defined';
var projectPort = yargs.p !== undefined ? yargs.p : 8080;

// Define absolute path of the root folder
var root = fs.realpathSync(__dirname + '/..') + '\\';

// Sass task with compass functionality
gulp.task('sass', function () {
  browserSync.notify("Updating styles");

  return gulp.src('../' + projectDirectory + '/theme/styles/sass/**/*.scss')
    // Inititalize sourcemaps
    .pipe(sourcemaps.init())
    // Initialize sass
    .pipe(sass().on('error', sass.logError))
    // Write sourcemaps (inline, in order to write into external file, try: sourcemaps.write('./maps'))
    .pipe(sourcemaps.write())
    // Output updated CSS to Mx deployment directory
    .pipe(gulp.dest(root + projectDirectory + '/deployment/web/styles/css')) 
    // Output updated CSS to theme directory
    .pipe(gulp.dest(root + projectDirectory + '/theme/styles/css'))
    // Stream the changes with browsersync
    .pipe(browserSync.stream());
});

// Browsersync task
gulp.task('browsersync', function() {
    browserSync.init({
        proxy: {
          target: "localhost:" + projectPort,
          ws: true
        },
        online: false,
        ghostMode: false
    });

    // Watch scss files and run the 'sass' task
   gulp.watch('../' + projectDirectory + '/theme/styles/sass/**/*.scss', gulp.series('sass'));
});

// Show Mendix project information
gulp.task('mxproject', function(callback) {
    console.log("[" + "MxGulp".magenta + "] Project directory: " + projectDirectory);
    console.log("[" + "MxGulp".magenta + "] Project port: " + projectPort);
    callback();
});

// Default task 
gulp.task('default', gulp.series('mxproject', 'browsersync'));