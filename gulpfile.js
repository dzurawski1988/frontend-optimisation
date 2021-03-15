/**
 * Front-end / web performance optimisation starter kit based on a simple Gulp 4 Starter Kit for modern web development.
 *
 * @package @jr-cologne/create-gulp-starter-kit
 * @author JR Cologne <kontakt@jr-cologne.de>
 * @copyright 2020 JR Cologne
 * @license https://github.com/jr-cologne/gulp-starter-kit/blob/master/LICENSE MIT
 * @version v0.11.0-beta
 * @link https://github.com/jr-cologne/gulp-starter-kit GitHub Repository
 * @link https://www.npmjs.com/package/@jr-cologne/create-gulp-starter-kit npm package site
 *
 * ________________________________________________________________________________
 *
 * gulpfile.js
 *
 * The gulp configuration file.
 *
 */
 
//  https://www.npmjs.com/package/gulp-responsive-imgz
// https://github.com/Maistho/gulp-html-srcset
// https://github.com/mahnunchik/gulp-responsive/blob/master/examples/advanced.md

// https://stackoverflow.com/questions/43401594/gulp-add-srcset-property-to-all-img-tags

const gulp                      = require('gulp'),
      del                       = require('del'),
      sourcemaps                = require('gulp-sourcemaps'),
      plumber                   = require('gulp-plumber'),
      sass                      = require('gulp-sass'),
      less                      = require('gulp-less'),
      stylus                    = require('gulp-stylus'),
      autoprefixer              = require('gulp-autoprefixer'),
      minifyCss                 = require('gulp-clean-css'),
      babel                     = require('gulp-babel'),
      webpack                   = require('webpack-stream'),
      uglify                    = require('gulp-uglify'),
      concat                    = require('gulp-concat'),
      imagemin                  = require('gulp-imagemin'),
      browserSync               = require('browser-sync').create(),
      dependents                = require('gulp-dependents'),
      htmlmin                   = require('gulp-htmlmin'),
      swPrecache                = require('sw-precache'),
      path                      = require('path'),
      critical                  = require('critical'),
      purgecss                  = require('gulp-purgecss'),
      srcset                    = require('gulp-srcset').default,
      imgRetina                 = require('gulp-responsive-imgz'),
      transform                 = require('gulp-html-transform').default,
      htmlSrcset                = require('gulp-html-srcset').default,
      srcsetLazy = require('gulp-srcset-lazy'),
      webp = require('gulp-webp'),
      src_folder                = './src/',
      src_assets_folder         = src_folder + 'assets/',
      dist_folder               = './dist/',
      dist_assets_folder        = dist_folder + 'assets/',
      rjs                       = require('gulp-requirejs')


gulp.task('clear', () => del([ dist_folder ]));


// gulp.task('views', function() {
//   return gulp.src('./src/*.html')
//     .pipe(srcsetLazy({
//      suffix: {
//     '1x': '.jpg',
//     '320w': '@320w.webp',
//     // '4x': '@540w.webp',
//     // '5x': '@860w.webp',
//     // '6x': '@1024w.webp',
//     // '7x': '@1280w.webp',
//     // '8x': '@1920w.webp',
//   }}
//     ))
//     .on('error', (e)=> {
//       console.log(e.message);
//     })
//     .pipe(gulp.dest(dist_folder));
 
// });

// var retinaOpts = {1: '', 2: '@320w', 3: '@540w'}

gulp.task('html', () => {
  gulp
    .src('src/*.html')
    .pipe(plumber())
    .pipe(
      transform(
        htmlSrcset({
          width: [1, 320, 540, 860, 1024, 1280, 1920],
          format: ['webp', 'png'],
        }),
        lqip({
          method: 'primaryColor',
        }),
      ),
    )
    .pipe(gulp.dest(dist_folder))
})


gulp.task('sass', () => {
  return gulp.src([
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss'
  ], { since: gulp.lastRun('sass') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(dependents())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('less', () => {
  return gulp.src([ src_assets_folder + 'less/**/!(_)*.less'], { since: gulp.lastRun('less') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('stylus', () => {
  return gulp.src([ src_assets_folder + 'stylus/**/!(_)*.styl'], { since: gulp.lastRun('stylus') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('purgecss', () => {
  return gulp.src(dist_assets_folder + 'css/**/*.css')
      .pipe(purgecss({
        content: [dist_folder + '*.html']
      }))
      .pipe(gulp.dest(dist_assets_folder + 'css'))
})

gulp.task('js', () => {
  return gulp.src([ 
    
    src_assets_folder + 'js/homework/*.js', 
     ], { since: gulp.lastRun('js') })
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production'
    }))
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: [ '@babel/env' ]
      }))
      // .pipe(concat('all.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('js-copy', () => {
  return gulp.src([ 
    // src_assets_folder + 'js/homework/*.js', 
    // src_assets_folder + 'js/homework/components/*.js',
    // src_assets_folder + 'js/homework/vendor/*.js', 
    src_assets_folder + 'js/homework/vendor/jquery/dist/*.js',
    src_assets_folder + 'js/homework/vendor/requirejs/*.js',
  ], { since: gulp.lastRun('js-copy'), base: src_assets_folder + 'js/homework' })
    .pipe(uglify())
    // .pipe(concat('all.js'))
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('js-minified', () => {
  return gulp.src([ 
    src_assets_folder + 'js/homework/vendor/jquery/dist/*.js', 
    src_assets_folder + 'js/homework/vendor/requirejs/*.js', 
  ], { since: gulp.lastRun('js-minified'), base: src_assets_folder + 'js/homework' })
    .pipe(uglify())
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src([ 
    src_assets_folder + 'js/homework/*.js', 
    src_assets_folder + 'js/homework/components/*.js',
    src_assets_folder + 'js/homework/vendor/*.js',
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dist_assets_folder + 'js'))
});

gulp.task('requirejsBuild', function() {
  return rjs({
      baseUrl: src_assets_folder + 'js/homework/',
      out: 'home.js',
      name: 'home', // no extension
      waitSeconds: 0,
      optimize: "uglify",
      paths: {
          "jquery"     : "vendor/jquery/dist/jquery.min",
          "tweenmax"   : "vendor/TweenMax.min",
          "async"      : "components/async",
          "google"     : "components/google",
          "waypoints"  : "components/waypoints.min"
      },
  
      shim: {
          'bxslider': {
            deps: ['jquery']
          },
          'waypoints': {
            deps: ['jquery']
          }
      },
      //exclude: ['jquery'],
      optimizeAllPluginResources: true,
  
      //Finds require() dependencies inside a require() or define call. By default
      //this value is false, because those resources should be considered dynamic/runtime
      //calls. However, for some optimization scenarios, it is desirable to
      //include them in the build.
      //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
      //by default.
      findNestedDependencies: true,
  })
  .pipe(gulp.dest(dist_assets_folder + 'js/homework')); // pipe it to the output DIR
});



gulp.task('images', () => {
  return gulp.src([ src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)' ], { since: gulp.lastRun('images') })
    .pipe(plumber())
    /*.pipe(imagemin())*/
    .pipe(gulp.dest(dist_assets_folder + 'images'))
    .pipe(browserSync.stream());
});

gulp.task('webp', async () => {
    var h = gulp.src(src_assets_folder + 'images/homework/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest(dist_assets_folder + 'images/homework'))

        var a = gulp.src(src_assets_folder + 'images/homework/anim/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest(dist_assets_folder + 'images/homework/anim'))


        var l = gulp.src(src_assets_folder + 'images/homework/i/logos/gallery/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest(dist_assets_folder + 'images/homework/i/logos/gallery'))

        var sl = gulp.src(src_assets_folder + 'images/homework/i/slideshow/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest(dist_assets_folder + 'images/homework/i/slideshow'))
});

gulp.task('srcset', async () => {
   var homework = gulp.src('./src/assets/images/homework/*.{jpg,png}')
  .pipe(srcset([{
            // match:  '(min-width: 10px)',
            width:  [1920, 1280, 1024, 860, 540, 320],
            format: ['webp']
        }], {
            skipOptimization: true
        }))
        .pipe(gulp.dest([
          dist_assets_folder + 'images/homework',
          ]))

          var anim = gulp.src('./src/assets/images/homework/anim/*.{jpg,png}')
  .pipe(srcset([{
            // match:  '(min-width: 50px)',
            width:  [320],
            format: ['webp']
        }], {
            skipOptimization: true
        }))
        .pipe(gulp.dest([
          dist_assets_folder + 'images/homework/anim',
          ]))

            var logos = gulp.src('./src/assets/images/homework/i/logos/gallery/*.{jpg,png}')
  .pipe(srcset([{
            // match:  '(min-width: 50px)',
            width:  [320],
            format: ['webp']
        }], {
            skipOptimization: true
        }))
        .pipe(gulp.dest([
          dist_assets_folder + 'images/homework/i/logos/gallery',
          ]))

                 var slideshow = gulp.src('./src/assets/images/homework/i/slideshow/*.{jpg,png}')
  .pipe(srcset([{
            // match:  '(min-width: 50px)',
            width:  [320],
            format: ['webp']
        }], {
            skipOptimization: true
        }))
        .pipe(gulp.dest([
          dist_assets_folder + 'images/homework/i/slideshow',
          ]))
});

gulp.task('html', () => {
  return gulp.src([ src_folder + '**/*.html' ], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
  // .pipe(transform(
  //   htmlSrcset({
  //     width: [1, 1920, 1280, 1024, 860, 540, 320],
  //     format: ['webp', 'jpg'],
  //   }),
  // ))
  // .pipe(imgRetina(retinaOpts))
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});


gulp.task('html-srcset', ()=> {
  return gulp.src(src_folder + '*.html')
  .pipe(transform(
    htmlSrcset({
      width: [1, 1920, 1280, 1024, 860, 540, 320],
      format: ['webp', 'png'],
    }),
  ))
  .pipe(gulp.dest(dist_folder))
})

gulp.task('html-minified', () => {
  return gulp.src(src_folder + '*.html')
  // .pipe(imgRetina())
  // .pipe(imgRetina({
  //     1: '', 2: 'dupablada', 3: 'jesteśzjebany'
  //   }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist_folder))
});


gulp.task('fonts', () => {
  return gulp.src([ src_assets_folder + 'fonts/**/*' ], { since: gulp.lastRun('fonts') })
    .pipe(gulp.dest(dist_assets_folder + 'fonts'))
    .pipe(browserSync.stream());
});

gulp.task('videos', () => {
  return gulp.src([ src_assets_folder + 'videos/**/*' ], { since: gulp.lastRun('videos') })
    .pipe(gulp.dest(dist_assets_folder + 'videos'))
    .pipe(browserSync.stream());
});

gulp.task('extra-files', () => {
  return gulp.src([ src_folder + '*.txt', src_folder + '*.json', src_folder + '*.ico' ], { since: gulp.lastRun('extra-files') })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', src_folder + 'sw/runtime-caching.js'])
    .pipe(gulp.dest(dist_folder + 'assets/js/sw'));
});

gulp.task('write-service-worker', (cb) => {
  const filepath = path.join(dist_folder, 'service-worker.js');

  swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: 'optimised-frontend',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      src_folder + 'sw/sw-toolbox.js',
      src_folder + 'sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${dist_folder}assets/js/homework/*.js`,
      `${dist_folder}assets/css/**/*.css`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: dist_folder
  }, cb);
});

gulp.task('generate-service-worker', gulp.series('copy-sw-scripts', 'write-service-worker'));

gulp.task('generate-critical-css', (cb) => {
  critical.generate({
    inline: true,
    base: dist_folder,
    src: 'homework-homepage.html',
    target: {
      html: 'homework-homepage-critical.html',
      css: 'critical.css',
    },
    width: 1300,
    height: 900,
  });
  cb();
});

gulp.task(
  'build', 
  gulp.series(
    'clear', 
     'html',
      'images',
      'webp',
    'srcset',
    'html-minified',
    // 'html-srcset',
    // 'views',
    'sass', 
    'less', 
    'stylus', 
    // 'js',
    'js-minified', 
    'scripts',
    'requirejsBuild',
    'fonts', 
    'videos',
    'extra-files', 
    /*'purgecss',*/
    /*'generate-critical-css',*/
    'generate-service-worker'
  )
);

gulp.task('dev', gulp.series('html', 'html-minified', 'sass', 'less', 'fonts', 'videos', 'extra-files', 'stylus', 'js', 'js-copy', 'srcset'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: [ 'dist' ]
    },
    port: 3000,
    open: false
  });
});

gulp.task('watch', () => {
  const watchImages = [
    src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'
  ];

  const watch = [
    src_folder + '**/*.html',
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss',
    src_assets_folder + 'less/**/*.less',
    src_assets_folder + 'stylus/**/*.styl',
    src_assets_folder + 'js/**/*.js',
    src_assets_folder + 'fonts/**/*',
    src_assets_folder + 'videos/**/*',
    src_folder + '*.txt',
    src_folder + '*.json',
    src_folder + '*.ico'
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));