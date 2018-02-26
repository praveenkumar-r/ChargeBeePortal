var gulp = require('gulp');
//var debug = require('gulp-debug');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');
//var imagemin = require('gulp-imagemin');
var clean = require('gulp-dest-clean');
var sort = require('gulp-sort');
var order = require("gulp-order");
var runSequence = require('run-sequence');
var exec = require('child_process').exec;
var htmlreplace = require('gulp-html-replace');
var del = require('del');
var extract = require("gulp-html-extract");
//var inject = require('gulp-inject-string');
var stripCode = require('gulp-strip-code');

//var readConfig = require('read-config');
//var config = readConfig('config.json');
var karma = require('karma');
var templateCache = require('gulp-angular-templatecache');
//var htmlmin = require('gulp-htmlmin');
var addStream = require('add-stream');

/*~~~~~~Js/Css Minification -Start~~~~~~*/

var cssMin = require('gulp-cssmin'); //For Css - Minification
var ngAnnotate  = require('gulp-ng-annotate'); //For Angular Js dependency injection as 'String' annotation - Minification
var uglify = require('gulp-uglify'); //For Angular Js - Minification
/*~~~~~~Js/Css Minification -End~~~~~~*/

var deployPath="public";

const APP_JS_PATH = 'app/**/!(*spec).js';
const VENDOR_JS_PATH = 'vendor/**/*.js';
const DIST_BASE_JS = deployPath+'/js';

const LESS_PATH  = 'app/**/*.less';
const VENDOR_LESS_PATH = 'vendor/**/*.less';
const DIST_BASE_LESS = deployPath+'/css';

const HTML_PATH = 'app/**/*.html';
const HTML_VENDOR_PATH = 'vendor/**/*.html';
const DIST_BASE_HTML = deployPath+'/assets/partials/';

const IMAGE_PATH = 'app/assets/images/**';
const DIST_BASE_IMAGE = deployPath+'/assets/images';

const FONTS_PATH = 'app/assets/fonts/**';
const DIST_BASE_FONT =deployPath+'/fonts/';

const MAIN_HTML='app/index.html';
const DIST_MAIN_HTML=deployPath;


gulp.task('cleanJS', function () {
	return del(DIST_BASE_JS, {
		force: true
	});
});

gulp.task('deploy',function(){
	console.log("Deploying to WEBAPP...");	
		
	gulp.src(PUBLIC)
	.pipe(gulp.dest(WEBAPP_FOLDER));
});


gulp.task('htmlProcess',function(){
	console.log("HTML process...");	
		
	 gulp.src(['!app/index.html',HTML_PATH])
	 .pipe(flatten())
    .pipe(gulp.dest(DIST_BASE_HTML));
	
	gulp.src([MAIN_HTML])
	 .pipe(flatten())
    .pipe(gulp.dest(DIST_MAIN_HTML));
});


gulp.task('fontProcess', function(){
	console.log("Copying Fonts folder.....");
	gulp.src(FONTS_PATH)
	.pipe(gulp.dest(DIST_BASE_FONT));
	
});

gulp.task('imageProcess', function(){
	console.log('copying images.....');
	 gulp.src(IMAGE_PATH)
        .pipe(gulp.dest(DIST_BASE_IMAGE));

});


gulp.task('jsProcess', function(){
	
	console.log("JS process...");
	
	gulp.src(["app/app.module.js","app/app.route.js",APP_JS_PATH])
	.pipe(concat('app.js'))	
	.pipe(gulp.dest(DIST_BASE_JS));
	
	gulp.src(["vendor/angular.min.js",
	    "vendor/angular-ui-route",VENDOR_JS_PATH])
	.pipe(concat('vendor.js'))	
	.pipe(gulp.dest(DIST_BASE_JS));
	
});
gulp.task('jsProcessMin', function(){
	
	console.log("JS process Min...");
	
	gulp.src(["app/app.module.js","app/app.route.js",APP_JS_PATH])
	.pipe(concat('app.min.js'))	
    .pipe(ngAnnotate()) //For Angular Js dependency injection as 'String' annotation - Minification
    .pipe(uglify({mangle: false})) //For Angular Js - Minification
	.pipe(gulp.dest(DIST_BASE_JS));
	
	gulp.src(["vendor/angular.min.js",
	    "vendor/angular-ui-route",VENDOR_JS_PATH])	
	.pipe(concat('vendor.min.js'))	
    .pipe(ngAnnotate()) //For Angular Js dependency injection as 'String' annotation - Minification
    .pipe(uglify({mangle: false})) //For Angular Js - Minification
	.pipe(gulp.dest(DIST_BASE_JS));
	
});

gulp.task('lessProcess',function(){
	console.log("Less process...");
	gulp.src(LESS_PATH)
	.pipe(flatten())
	.pipe(sort())	
	.pipe(less())    
	.pipe(concat('app.css'))
    .pipe(gulp.dest(DIST_BASE_LESS));
	
});

gulp.task('lessProcessMin',function(){
	console.log("Less process Min...");
	gulp.src(LESS_PATH)
	.pipe(flatten())
	.pipe(sort())	
    .pipe(less())    
    .pipe(cssMin()) //For Css - Minification
	.pipe(concat('app.min.css'))
    .pipe(gulp.dest(DIST_BASE_LESS));
	
});

gulp.task('watch', ['watch-HTML','watch-JS','watch-LESS']);
gulp.task('watch-JS', function() {
	return watch(APP_JS_PATH,function(){
	   console.log("watch compiling JS.....");
	   
	    gulp.src(["app/app.module.js","app/app.route.js",APP_JS_PATH])
		.pipe(concat('app.js'))	
		.pipe(gulp.dest(DIST_BASE_JS));
		
		gulp.src(["vendor/angular.min.js",
	    "vendor/angular-ui-route",VENDOR_JS_PATH])
		.pipe(concat('vendor.js'))	
		.pipe(gulp.dest(DIST_BASE_JS));
		})
});
gulp.task('watch-HTML', function() {
	return watch(HTML_PATH,function(){
	   console.log("watch compiling HTML.....");
		
		 gulp.src(['!app/index.html',HTML_PATH])
		.pipe(flatten())
		.pipe(gulp.dest(DIST_BASE_HTML));

		gulp.src([MAIN_HTML])
		.pipe(flatten())
		.pipe(gulp.dest(DIST_MAIN_HTML));
		
	})
});
gulp.task('watch-LESS', function () {
	return watch(LESS_PATH, function(){
		console.log("watch compiling LESS.....");
	    gulp.src(LESS_PATH)
		.pipe(flatten())
		.pipe(sort())	
	    .pipe(less()) 
.pipe(concat('app.css'))		
	    .pipe(gulp.dest(DIST_BASE_LESS));
	}) 
}); 

gulp.task('default', function(cb) {
	
  runSequence( ['cleanJS', 'htmlProcess', 'lessProcess','lessProcessMin', 'jsProcess','jsProcessMin', 'imageProcess', 'fontProcess'], cb);
});


gulp.task('local', function(cb) {
  runSequence( ['cleanJS', 'htmlProcess', 'lessProcess', 'jsProcess', 'imageProcess', 'fontProcess'],'watch',cb);
});
