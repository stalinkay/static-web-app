'use strict';

// import plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// constants
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// base dirs
const dirs = {
  src: 'src',
  dest: 'dist'
};

// sass paths
const sassPaths = {
  src: `${dirs.src}/sass/`,
  dest: `${dirs.dest}/css/`
};

// less paths
const lessPaths = {
  src: `${dirs.src}/less/`,
  dest: `${dirs.dest}/less/`
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
 *  This is the build task. It is runs all tasks
 */
//['lint', 'html', 'images', 'fonts', 'extras']
gulp.task('build', ['changelog'], () => {
  // return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*
 *  This is the default task. It is ran once on gulp
 */
gulp.task('default', [], () => {
  gulp.start('build');
});
