import RevAll       from 'gulp-rev-all';
import autoprefixer from 'gulp-autoprefixer';
import base64       from 'gulp-base64';
import browserify   from 'browserify';
import buffer       from 'vinyl-buffer';
import del          from 'del'
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import minify       from 'gulp-minify-css';
import sass         from 'gulp-sass';
import sequence     from 'gulp-sequence';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import svgmin       from 'gulp-svgmin';
import tsify        from 'tsify';
import uglify       from 'gulp-uglify';
import util         from 'gulp-util';
import watch        from 'gulp-watch';
import watchify     from 'watchify';

var env    = process.env.NODE_ENV || 'development'
var assets = 'app/assets';
var dest   = 'public/assets';

var isProduction = () => env === 'production'

gulp.task('default', (cb) =>
  sequence('reset', ['svg', 'fonts', 'images'], 'sass', 'ts', 'manifest', cb)
);

gulp.task('watch', (cb) =>
  sequence('reset', ['svg', 'fonts', 'images'], 'sass', 'ts:watch', 'all:watch', cb)
);

gulp.task('manifest', function() {
  var revAll = new RevAll();

  return gulp.src(['public/assets/**'])
    .pipe(gulp.dest('public/assets'))
    .pipe(revAll.revision())
    .pipe(gulp.dest('public/assets'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('reset', () =>
  del(dest)
);

gulp.task('svg', () =>
  gulp.src(`${assets}/images/**/*.svg`).pipe(gulp.dest(dest))
);

gulp.task('images', () =>
  gulp.src(`${assets}/images/**/*.{png,jpg}`).pipe(gulp.dest(dest))
);

gulp.task('fonts', () =>
  gulp.src(`${assets}/fonts/**/*.{eot,svg,ttf,woff,woff2}`).pipe(gulp.dest(dest))
);

gulp.task('sass', () =>
  gulp.src(`${assets}/stylesheets/application.scss`)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(gulpif(isProduction(), base64({
      baseDir: 'public/assets',
      debug: isProduction()
    })))
    .pipe(autoprefixer())
    .pipe(gulpif(isProduction(), minify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
);

gulp.task('ts', ts());

gulp.task('ts:watch', ts({ watch: true }));

gulp.task('all:watch', () => {
  gulp.watch(`${assets}/images/**/*.svg`, ['svg']);
  gulp.watch(`${assets}/images/**/*.{png,jpg}`, ['images']);
  gulp.watch(`${assets}/fonts/**/*.{eot,svg,ttf,woff,woff2}`, ['fonts']);
  gulp.watch(`{${assets}/stylesheets,node_modules}/**/*.{scss,css}`, ['sass']);
})

function ts(options={}) {
  var b = browserify(Object.assign({}, watchify.args, { debug: isProduction() }))
    .add('app/assets/javascripts/application.ts')
    .plugin(tsify, {
      target: 'es5',
      module: 'commonjs',
      noImplicitAny: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    });

  if (options.watch == true) {
    b = watchify(b).on('update', bundle).on('log', util.log);
  }

  function bundle() {
    return b.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source('application.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(isProduction(), uglify()))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dest));
  }

  return bundle;
}
