import gulp         from 'gulp';
import RevAll       from 'gulp-rev-all';
import autoprefixer from 'gulp-autoprefixer';
import base64       from 'gulp-base64';
import gulpif       from 'gulp-if';
import minify       from 'gulp-minify-css';
import sass         from 'gulp-sass';
import sequence     from 'gulp-sequence';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';
import util         from 'gulp-util';
import watch        from 'gulp-watch';
import browserify   from 'browserify';
import buffer       from 'vinyl-buffer';
import del          from 'del'
import source       from 'vinyl-source-stream';
import tsify        from 'tsify';
import watchify     from 'watchify';

var env = process.env.NODE_ENV || 'development'

var config = {
  env: {
    production: env === 'production', development: env === 'development', test: env === 'test'
  },

  ext: {
    svg: "svg", images: "{png,jpg}", fonts: "{eot,svg,ttf,woff,woff2}", sass: "{scss,css}"
  },

  src: 'app/assets', dest: 'public/assets'
}

gulp.task('default', (callback) =>
  sequence('reset', ['svg', 'fonts', 'images'], 'sass', 'ts', 'manifest', callback)
);

gulp.task('watch', (callback) =>
  sequence('reset', ['svg', 'fonts', 'images'], 'sass', ['svg:watch', 'fonts:watch', 'images:watch', 'sass:watch', 'ts:watch'], callback)
);

gulp.task('reset', () =>
  del(config.dest)
);

gulp.task('manifest', () => {
  var revAll = new RevAll();

  return gulp.src([`${config.dest}/**`])
    .pipe(gulp.dest(config.dest))
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.dest))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.dest));
});

gulp.task('svg', () =>
  gulp.src(`${config.src}/images/**/*.${config.ext.svg}`).pipe(gulp.dest(config.dest))
);

gulp.task('svg:watch', () =>
  gulp.watch(`${config.src}/images/**/*.${config.ext.svg}`, ['svg'])
)

gulp.task('images', () =>
  gulp.src(`${config.src}/images/**/*.${config.ext.images}`).pipe(gulp.dest(config.dest))
);

gulp.task('images:watch', () =>
  gulp.watch(`${config.src}/images/**/*.${config.ext.images}`, ['images'])
)

gulp.task('fonts', () =>
  gulp.src(`${config.src}/fonts/**/*.${config.ext.fonts}`).pipe(gulp.dest(config.dest))
);

gulp.task('fonts:watch', () =>
  gulp.watch(`${config.src}/fonts/**/*.${config.ext.fonts}`, ['fonts'])
)

gulp.task('sass', () =>
  gulp.src(`${config.src}/stylesheets/application.scss`)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(gulpif(config.env.production, base64({ baseDir: config.dest,  extensions: [/\#datauri('|")?$/i], maxImageSize: 0 })))
    .pipe(autoprefixer())
    .pipe(gulpif(config.env.production, minify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
);

gulp.task('sass:watch', () =>
  gulp.watch(`{${config.src}/stylesheets,node_modules}/**/*.${config.ext.sass}`, ['sass'])
)

gulp.task('ts', ts());

gulp.task('ts:watch', ts({ watch: true }));

function ts(options={}) {
  var b = browserify(Object.assign({}, watchify.args, { debug: config.env.production }))
    .add(`${config.src}/javascripts/application.ts`)
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
      .pipe(gulpif(config.env.production, uglify()))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest));
  }

  return bundle;
}
