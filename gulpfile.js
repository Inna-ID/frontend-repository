var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	prefixer = require('gulp-autoprefixer'),
	rigger = require('gulp-rigger'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssmin = require('gulp-cssmin'),
	browserSync = require('browser-sync'),
	del = require('del'),
	reload = browserSync.reload;

var config = {
	server: {
		baseDir: "build"
	},
	tunnel: true,
	host: 'localhost',
	port: 3000,
	logPrefix: "Frontend",
	notify: false
};

gulp.task('html', function () {
	gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('build'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('less', function () {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(prefixer())
		.pipe(gulp.dest('build/css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('scripts', function () {
	gulp.src('src/js/scripts.js')
		.pipe(gulp.dest('build/js'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('styles-libs', function () {
	gulp.src('src/css/libs/*.css')
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('build/css'));
});

gulp.task('scripts-libs', function () {
	gulp.src('src/js/libs/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
});

gulp.task('fonts', function () {
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'))
});

gulp.task('images', function () {
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('build/img'))
});

gulp.task('build', [
	'clean',
   'html',
	'less',
	'scripts',
	'styles-libs',
	'scripts-libs',
	'fonts',
	'images'
]);

gulp.task('clean', function () {
	del.sync('build');
});

gulp.task('watch', function () {
	watch(['src/**/*.html'], function (event, cb) {
		gulp.start('html');
	});
	watch(['src/less/*.less'], function (event, cb) {
		gulp.start('less');
	});
	watch(['src/js/*.js'], function (event, cb) {
		gulp.start('scripts');
	});
});

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);
