var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('gulp-git');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));

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

// Creando repositorio

gulp.task('init', function(){
   git.init(function(err){
       if(err) throw err;
   
       console.log("Repositorio inicializado.");
   });
   
});

gulp.task('addremote', function(){
   git.addRemote('origin', json.repository.url, function(err){
       if(err) throw err;
       
       console.log("Repositorio remoto añadido correctamente.");
   });
});


// Push inicial

gulp.task('push_inicial', ['init', 'addremote'], function(){
    git.push('origin', 'master', function(err){
       if(err) 
       {
           console.log("err:"+err);
           throw err; 
       }
    });
});


//Actualizar repositorio

gulp.task('git-add', function(){
    return gulp.src('')
               .pipe(git.add());
});

gulp.task('git-commit', function(){
    return gulp.src('')
               .pipe(git.commit('Actualizando Gitbook'));
});

gulp.task('push', ['git-add','git-commit'], function(){
    git.push('origin', 'master', function(err){
       if(err) 
       {
           console.log("err:"+err);
           throw err; 
       }
    });
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