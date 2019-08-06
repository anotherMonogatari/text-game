const { src, dest, watch } = require('gulp') ;
const sass = require('gulp-sass');

const styles = () => {
    return src('./*.scss')
    .pipe(sass())
    .pipe(dest('./'))
}

exports.default = () => {watch('./style.scss', styles)}