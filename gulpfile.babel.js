'use strict';

// import plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import mkdirp from 'mkdirp';

// constants
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// base dirs
const dirs = {
  src: 'src',
  dest: 'dist'
};

// sass paths
const fontPaths = {
  src: `${dirs.src}/fonts/`,
  dest: `${dirs.dest}/fonts/`
};

// sass paths
const sassPaths = {
  src: `${dirs.src}/sass/`,
  dest: `${dirs.dest}/css/`
};

// less paths
const lessPaths = {
  src: `${dirs.src}/less/`,
  dest: `${dirs.dest}/css/`
};

// js paths
const jsPaths = {
  src: `${dirs.src}/js/`,
  dest: `${dirs.dest}/js/`
};

// images paths
const imagePaths = {
  src: `${dirs.src}/images/`,
  dest: `${dirs.dest}/images/`
};

/*
 *  create required directories
 */
gulp.task('mkdir', () => {

  let paths = {
    sass: sassPaths,
    less: lessPaths,
    js: jsPaths,
    images: imagePaths
  };

  mkdirp(dirs.dest, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp(sassPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp(lessPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp(jsPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp(imagePaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });


  // return gulp.src(dirs.src)
  // .pipe($.util.noop())
  // .pipe(gulp.dest(dirs.dest));

});

/*
 *  BrowseSync handles the loading, refreshing and synching between different browsers
 */
gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'src/components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});


/*
 *  Generate a Changelog
 */
gulp.task('changelog', () => {

  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
    .pipe($.conventionalChangelog({
      preset: 'eslint'
    }))
    .pipe(gulp.dest('./'));

});

/*
 *  Create directories and cleanup
 */
gulp.task('setup', ['mkdir'], () => {
  // return gulp.src('dist/**/*').pipe(gulp.dest(dirs.dist));
});

/*
 *  This is the build task. It is runs all tasks
 */
//['lint', 'html', 'images', 'fonts', 'extras']
gulp.task('build', ['changelog', 'setup'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*
 *  This is the default task. It is ran once on gulp
 */
gulp.task('default', [], () => {
  gulp.start('build');
});
