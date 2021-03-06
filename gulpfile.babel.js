'use strict';

// import plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import mkdirp from 'mkdirp';
import del from 'del';


// constants
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// base dirs
const dirs = {
  src: 'src',
  dest: 'dist',
  temp: '.tmp'
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
gulp.task('clean', (cb) => {
  var directories = [];
  directories.push(dirs.temp, dirs.dest, 'CHANGELOG.md'); // directories to delete
  delDryRun(directories);
  del.sync(directories);
  cb();
});

function delDryRun(directories) {

  if (typeof directories == 'undefined' || !directories) {
    return;
  }
  del(directories, {dryRun: true}).then(paths => {
	   console.log('Files and folders that would be deleted:\n', paths.join('\n'));
  });

}

/*
 *  create required directories
 */
gulp.task('mkdir', (cb) => {

  let paths = {
    sass: sassPaths,
    less: lessPaths,
    js: jsPaths,
    images: imagePaths
  };

  // create destination folder
  mkdirp.sync(dirs.dest, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp.sync(sassPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp.sync(lessPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp.sync(jsPaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });

  mkdirp.sync(imagePaths.src, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('pow!');
      }
  });


  // return gulp.src(dirs.src)
  // .pipe($.util.noop())
  // .pipe(gulp.dest(dirs.dest));
  cb();
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


// Will patch the version
gulp.task('bump-prerelease', function(){
  gulp.src('./*.json')
  .pipe($.bump({type:'prerelease'}))
  .pipe(gulp.dest('./'));
});

// Will patch the version
gulp.task('bump-patch', function(){
  gulp.src('./*.json')
  .pipe($.bump())
  .pipe(gulp.dest('./'));
});

// Defined method of updating:
// Semantic
gulp.task('bump-minor', function(){
  gulp.src('./*.json')
  .pipe($.bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

// Defined method of updating:
// Semantic major
gulp.task('bump-major', function(){
  gulp.src('./*.json')
  .pipe($.bump({type:'major'}))
  .pipe(gulp.dest('./'));
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
gulp.task('setup', ['clean', 'mkdir'], () => {
  return gulp.src(dirs.src).pipe($.util.noop());
});

/*
 *  This is the build task. It is runs all tasks
 */
//['lint', 'html', 'images', 'fonts', 'extras']
gulp.task('build', ['changelog'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*
 *  This is the default task. It is ran once on gulp
 */
gulp.task('default', ['setup'], () => {
  gulp.start('build');
});
