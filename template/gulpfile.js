var gulp = require('gulp');
var shell = require('gulp-shell');
var watch = require('gulp-watch');
var install = require('gulp-install');

gulp.task('construir_gitbook', function()
{
    return gulp.src('./scripts')
        .pipe(shell([
            "gitbook install"
        ]))        
        .pipe(shell([
           "./scripts/losh generate-gitbook" 
        ]))
        .pipe(shell([
           "./scripts/losh generate-wiki"
        ]))
        .pipe(shell([
            "./scripts/losh deploy-gitbook"
        ]))
        .pipe(shell([
            "./scripts/losh deploy-wiki"    
        ]))
});

gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'    
    ])) 
});


gulp.task('default', function(){
    gulp.watch(['scripts/*', 'txt/**/*.md', 'book.json'], ['construir_gitbook']); 
});