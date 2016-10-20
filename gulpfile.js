var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('simple-git');
var myArgs = require('minimist')(process.argv.slice(2));

//------------------------------------------------------------------------------------
// Repositorio Github
gulp.task('push', function(){
    var mensaje_commit = myArgs.mensaje || "Actualizando paquete";
    git()
        .add('./*')
        .commit(mensaje_commit)
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