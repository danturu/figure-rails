import RevAll       from 'gulp-rev-all'
import autoprefixer from 'gulp-autoprefixer'
import base64       from 'gulp-base64'
import browserify   from 'browserify'
import del          from 'del'
import gulp         from 'gulp';
import gulpif       from 'gulp-if'
import minify       from 'gulp-minify-css'
import sass         from 'gulp-sass'
import sequence     from 'gulp-sequence'
import shell        from 'gulp-shell'
import sourcemaps   from 'gulp-sourcemaps'
import ts           from 'gulp-typescript'
import util         from 'gulp-util'
import watch        from 'gulp-watch'
import watchify     from 'watchify'

let env = process.env.NODE_ENV || 'development'

let config = {
  env: {
    production: env === 'production', development: env === 'development', test: env === 'test'
  },

  ext: {
    svg: "svg", images: "{png,jpg}", fonts: "{eot,svg,ttf,woff,woff2}", sass: "{scss,css}", ts: "{ts,d.ts,js}"
  },

  lib: [
    "systemjs/dist/system.src.js",
    "angular2/bundles/angular2.dev.js",
    "angular2/bundles/router.dev.js",
    "angular2/bundles/router.dev.js.map",
    "angular2/bundles/http.dev.js",
    "immutable/dist/immutable.js",
  ],

  src: 'app/assets', dest: 'public/assets'
}

let tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
});

// Main.

gulp.task('postinstall', (done) =>
  sequence('reset.typings', 'install.typings', done)
);

gulp.task('default', (done) =>
  sequence('reset', 'build', 'build.manifest', done)
);

// Reset.

gulp.task('reset.typings', (done) =>
  del(`${config.src}/javascripts/typings/tsd`, done)
);

gulp.task('reset', (done) =>
  del(config.dest, done)
);

// Install.

gulp.task('install.typings', shell.task([
  'tsd reinstall --overwrite', 'tsd link', 'tsd rebundle'
]));

// Build.

gulp.task('build.svg', () =>
  gulp.src(`${config.src}/images/**/*.${config.ext.svg}`).pipe(gulp.dest(config.dest))
);

gulp.task('build.images', () =>
  gulp.src(`${config.src}/images/**/*.${config.ext.images}`).pipe(gulp.dest(config.dest))
);

gulp.task('build.fonts', () =>
  gulp.src(`${config.src}/fonts/**/*.${config.ext.fonts}`).pipe(gulp.dest(config.dest))
);

gulp.task('build.libs', () =>
  gulp.src(config.lib.map(lib => `node_modules/${lib}`)).pipe(gulp.dest(config.dest))
);

gulp.task('build.sass', () =>
  gulp.src(`${config.src}/stylesheets/application.scss`)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(gulpif(config.env.production, base64({ baseDir: config.dest,  extensions: [/\#datauri('|")?$/i], maxImageSize: 0 })))
    .pipe(autoprefixer())
    .pipe(gulpif(config.env.production, minify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
);

gulp.task('build.ts', () => {
  let tsResult = gulp.src(`${config.src}/javascripts/**/*.${config.ext.ts}`)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
})

gulp.task('build.index', () => {
  console.log(gulp.src([`${config.dest}/**/*.js`], { base: config.dest }))
});

gulp.task('build.manifest', () => {
  var revAll = new RevAll();

  return gulp.src([`${config.dest}/**`])
    .pipe(gulp.dest(config.dest))
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.dest))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.dest));
});

gulp.task('build', (done) =>
  sequence('reset', ['build.svg', 'build.fonts', 'build.images', 'build.libs'], 'build.sass', 'build.ts', done)
);

// Watch.

gulp.task('watch.svg', () =>
  gulp.watch(`${config.src}/images/**/*.${config.ext.svg}`, ['build.svg'])
)

gulp.task('watch.images', () =>
  gulp.watch(`${config.src}/images/**/*.${config.ext.images}`, ['build.images'])
)

gulp.task('watch.fonts', () =>
  gulp.watch(`${config.src}/fonts/**/*.${config.ext.fonts}`, ['build.fonts'])
)

gulp.task('watch.sass', () =>
  gulp.watch(`${config.src}/stylesheets/**/*.${config.ext.sass}`, ['build.sass'])
)

gulp.task('watch.libs', () =>
  gulp.watch(config.lib.map(lib => `node_modules/${lib}`), ['build.libs'])
);

gulp.task('watch.ts', () =>
  gulp.watch(`${config.src}/javascripts/**/*.${config.ext.ts}`, ['build.ts'])
);

gulp.task('watch', (done) =>
  sequence('build', ['watch.svg', 'watch.fonts', 'watch.images', 'watch.libs', 'watch.sass', 'watch.ts'], done)
);
