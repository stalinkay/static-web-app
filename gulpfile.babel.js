'use strict';

import gulp from 'gulp';

/*
 *  This is the build task. It is runs all tasks
 */
//['lint', 'html', 'images', 'fonts', 'extras']
gulp.task('build', [], () => {
  // return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*
 *  This is the default task. It is ran once on gulp
 */
gulp.task('default', [], () => {
  gulp.start('build');
});
