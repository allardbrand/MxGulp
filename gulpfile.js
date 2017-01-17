var gulp = require('gulp'),
    sass = require('gulp-sass'),
    colors = require('colors'),
    fs = require('fs'),
    path = require('path'),
    compass = require('compass-importer'),
    yargs = require('yargs').argv,
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// Standard configuration, can be overridden by use of parameters
var projectDirectory = 'No project defined';
var projectPort = 8080;

// Read project  directory and port from parameter(s) 
// Example: gulp -d "Example project-main" -p 8080
if (yargs.d !== undefined) projectDirectory = yargs.d;
if (yargs.p !== undefined) projectPort = yargs.p;

// Define absolute path of the root folder
var root = fs.realpathSync(__dirname + '/..') + '\\';

// Error details
function showErrorDetails(error) {
  console.log(error.toString());
  this.emit('end');
};

// Sass task with compass functionality
gulp.task('sass', function () {
  return gulp.src('../' + projectDirectory + '/theme/styles/sass/**/*.scss')
    // Inititalize sourcemaps
    .pipe(sourcemaps.init())
    // Initialize sass
    .pipe(
    	sass({
        	// Use compass
    		importer: compass
    	})
    	.on('error', showErrorDetails)
    )
    // Write sourcemaps (inline, in order to write into external file, try: sourcemaps.write('./maps'))
    .pipe(sourcemaps.write())
    // Output css to MX deployment directory where browser-sync will trigger the refresh
    .pipe(gulp.dest(root + projectDirectory + '/deployment/web/styles/css')) 
    // Output css to MX development directory and will be included on commit to SVN teamserver
    .pipe(gulp.dest(root + projectDirectory + '/theme/styles/css'))
    // Stream css changes with browser-sync
    .pipe(browserSync.stream());
});

// Browser sync task
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:" + projectPort,
        online: false,
        ws: true
    });

    // Watch scss files and run the 'sass' task
   gulp.watch('../' + projectDirectory + '/theme/styles/sass/**/*.scss', ['sass']);
});

// Show mendix project
gulp.task('showmendixproject', function() {
    console.log("[" + "MxGulp".red + "] Project directory: " + projectDirectory);
    console.log("[" + "MxGulp".red + "] Project port: " + projectPort);
});

// Default task 
gulp.task('default', ['showmendixproject', 'browser-sync']);