import gulp from 'gulp';
import Registry from './index';

gulp.registry(new Registry({dist: './dist'}));
