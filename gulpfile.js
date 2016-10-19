var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('simple-git');

//------------------------------------------------------------------------------------
// Repositorio Github
gulp.task('push', function(){
    git()
        .add('./*')
        .commit("Actualizando paquete")
        .push('origin', 'master');
});

//------------------------------------------------------------------------------------
// Instalar dependencias y recursos

gulp.task('instalar_recursos', function()
{
    gulp.src(['./package.json']).pipe(install());
});

//------------------------------------------------------------------------------------

//Deploy
gulp.task('deploy', ['instalar_recursos', 'push'], function()
{
    return gulp.src('')
           .pipe(shell([
            'npm publish'
           ]))
});

//------------------------------------------------------------------------------------

gulp.task('default', ['deploy']);