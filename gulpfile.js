/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @authors Shahid Basheer
 * @package neat 
 */

 
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass')(require('node-sass')),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload, 
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	path = require('path'),
	preprocess = require('gulp-preprocess'),
	compass = require('gulp-compass'),
	uncss = require('gulp-uncss'),
	replace = require('gulp-replace'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	plumber = require('gulp-plumber'),
	notify           = require('gulp-notify'),
	path             = require('path'),
	rename           = require('gulp-rename'),
	minifycss        = require('gulp-minify-css'),
	changedInPlace = require('gulp-changed-in-place'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed'),
	zip = require('gulp-zip')

	;
	

	var browserSync_server = './';
	var rootAddress = '';
	
	// gulp replace
	var replaceSource = rootAddress  + '/*.php';
	var replaceDest = rootAddress  + 'build';

	//the title and icon that will be used for the Grunt notifications
	
	var notifyInfo = {
		title: 'Gulp'
		
	};
	//icon: path.join(__dirname, 'gulp.png')

	//error notification settings for plumber
	var plumberErrorHandler = { errorHandler: notify.onError({
			title: notifyInfo.title,
			
			message: "Error: <%= error.message %>"
		})
	};
	//icon: notifyInfo.icon,

	gulp.task('two', function(done) {
	  // do things
	  done();
	});

	// Sass
	var sassSourceStyle = './sass/style.scss';
	var sassDest = './build/css';
	console.log(sassDest);
	//var sassDesttheme_style = 'C:\\xampp\\htdocs\\mentessori\\wp-content\\themes\\mentessori\\assets\\css';
	//Type: String Default: nested Values: nested, expanded, compact, compressed
	
	gulp.task('sass', gulp.series('two', function() {
	  
	  // var result = sass.renderSync({file: sassSourceStyle});
	  // var sassSourceStyle = result;
	  
	  return  gulp.src( sassSourceStyle )
	  	.pipe(plumber(plumberErrorHandler))
	  	.pipe(sourcemaps.init())
	    .pipe(sass())
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest( sassDest ))
	    .pipe(rename({ suffix: '.min' }))
	  	.pipe(minifycss())
	  	.pipe(gulp.dest( sassDest ))
	   	.pipe(reload({stream:true}))
	    .pipe(notify({
	      message: 'Styles task complete'
	    }));

	}));

	var syncOpts = {
		open: false,
		notify: true
	};

	gulp.task('browserSync', function() {
		 browserSync.init({
		 	injectChanges: true,
        	server: {
		            baseDir: browserSync_server
		        }
		    });
	});

	var htmlSource = './html/*.html';
	var htmlDest =  './build';

	gulp.task('html', function() {
	  return  gulp.src( htmlSource )
	  	.pipe(changedInPlace())
	  	.pipe(preprocess())
	    .pipe(gulp.dest( htmlDest ))
	    // .pipe(browserSync.reload())
	});

	gulp.task('html:all', function() {
	  return  gulp.src( htmlSource )
	  	.pipe(preprocess())
	    .pipe(gulp.dest( htmlDest ))
	    // .pipe(browserSync.reload())
	});




	// (gulp watch)
	gulp.task('watch', function () {

		gulp.parallel('browserSync');
	    watch('./html/*.html', gulp.series('html:all'));
	    watch('./sass/*.scss', gulp.series('sass'));

	   
	});

	//Do everything once!
  gulp.task('default', function(){
    	
    	browserSync.init({
		 	injectChanges: true,
        	server: {
		            baseDir: browserSync_server
		        }
		    });

	    gulp.watch('./html/**/*.html', gulp.series('html:all'));
	    gulp.watch('./html/**/*.html').on('change', browserSync.reload);
		gulp.watch('./sass/**/*.scss', gulp.series('sass'));
		gulp.watch('./sass/**/*.scss').on('change', browserSync.reload);
		
	  	return
	});

	// gulp.task('default', gulp.series('watch',function () {
	// 	 gulp.parallel('browserSync');
	// 	 return; 
	// } ));

	


