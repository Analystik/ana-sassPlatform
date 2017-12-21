var gulp = require('gulp');
//var del = require('del');
//var critical = require('critical').stream;
var pngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var gutil = require('gulp-util');
var sassLint = require('gulp-sass-lint');
//var revReplace = require('gulp-rev-replace');
var $ = require('gulp-load-plugins')({lazy: true});




//lint task

//function isFixed(file) {

//    return file.eslint != null && file.eslint.fixed;
//}



//gulp.task('jslint',['clean'], function(){
//    return gulp
//        .src(['./src/js/**/*.js', '!./src/js/googleanalytics.js','!./src/js/svg4everybody.js','!./src/js/mouseflow.js', '!./src/js/tawk.js','!./src/js/animation.js','!./src/js/cookie.js','!./src/js/scripts.js'])
//        .pipe($.eslint({fix:true}))
//        .pipe($.eslint.format())
//        .pipe($.if(isFixed, gulp.dest('./src/js/fixtures')))

//        .pipe($.eslint.failAfterError())
//})

gulp.task("sasslint", function(){
    return gulp
        .src(['./sass/**/*.scss'])
        .pipe(sassLint( {options:{

            configFile: './sass-lint.yml',
        }}))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});


//compile css - pug

gulp.task('css', ['sasslint'], function(){
return gulp
		.src('./sass/styles.scss')
		.pipe($.sass())
		.pipe($.autoprefixer({
            browsers: ['ie >= 11', 'last 2 versions', 'last 2 versions'],
            cascade: false
        }))
        .pipe($.csso())
		.pipe(gulp.dest('./css/'))

});

// js script concatenatetion on html files


//gulp.task('compiled',['css'], function(){
//    var jsFilter = $.filter("**/*.js", { restore: true });
//    var cssFilter = $.filter("**/*.css", { restore: true });
//    var indexHtmlFilter = $.filter(['**/*', '!**/*.html'], { restore: true });


//	return gulp.src('./src/**/*.html')
//    .pipe($.useref())      // Concatenate with gulp-useref
//    .pipe(jsFilter)
//    .pipe($.uglify())
//    .pipe(jsFilter.restore)
//    .pipe(cssFilter)
//    .pipe($.csso())               // Minify any CSS sources
//    .pipe(cssFilter.restore)
//    .pipe(indexHtmlFilter)
//    .pipe($.rev())                // Rename the concatenated files (but not index.html)
//    .pipe(indexHtmlFilter.restore)
//    .pipe(revReplace())         // Substitute in new filenames
//	.pipe(gulp.dest('./build/'));
//});



// google css on top

//gulp.task('critical',['compiled'], function(){
//    gulp.task('critical', function () {
//    return gulp.src('build/**/*.html')
//        .pipe(critical({
//            base: 'build/',
//            inline: true,
//            minify:true,
//            ignore: ['@font-face','@import'],
//            timeout: 60000,

//            css: './src/css/styles.css'})
//        )
//        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
//        .pipe(gulp.dest('build'));
//});
//});


//minify html


//image task

gulp.task('svgoptim', function(){
    return gulp.src('./src/images/**/*.svg')
    .pipe($.svgmin())
    .pipe(gulp.dest('./build/images/'));
});


gulp.task('retina', function(){

    return gulp.src('./images/**/*.{jpg,png}')
        .pipe($.responsive({
          // Resize all JPG images to three different sizes: 100, 200, and 400, 800 pixels
          '**/*.jpg': [{
            width: 600,
            rename: { suffix: 'phone_2x' },
            quality: 100
          }, {
            width: 960,
            rename: { suffix: 'phone-land_2x' },
          }, {
            width: 1536,
            rename: { suffix: 'tablet_2x' },
          }, {
            width: 1920,
            rename: { suffix: '' },
            },{
          width: 2880,
            rename: { suffix: '_2x' },
            },{
            // Compress, strip metadata, and rename original image
            rename: { suffix: '-original' },
          }],
          // Resize all PNG images to be retina ready
        //   '**/*.png': [{
        //     width: 72,
        //     rename: { suffix:'_thumb'}
        //     }, {
        //     width: 144,
        //     rename: { suffix: '_thumb_2x' }
        // },
        // {
        //     width: 580,
        // },{
        //     width: 1160,
        //     rename:{ suffix:'_2x'}
        //
        //     }],
        //     },
        // {
        //
        //   withMetadata: false,
        //   progressive: false,
        //   withoutEnlargement: true,
        //   quality: 100,
        //   toColourspace: 'rgb',
        //   ChromaSubsampling:'4:2:2',
        //   errorOnEnlargement: false,
        }))
        .pipe(gulp.dest('./images/final/'));
    });


gulp.task('png', ['retina'], function(){
	 return gulp.src('./images/*.png')
        .pipe($.imagemin({
            progressive: true,
            verbose: true,
            quality:68,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images/final/'));
});


// gulp.task('image-optim', ['clientsprite'], function(){
// 	 return gulp.src('./src/images/optim/**/*.jpg')
//         .pipe($.imagemin([
//             imageminJpegRecompress({
//                 verbose: true,
//                 progressive: true,
//                 max: 80,
//                 min: 70
//             })
//         ]))
//         .pipe(gulp.dest('./build/images/'));
// });
