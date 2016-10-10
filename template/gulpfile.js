var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('gulp-git');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));

//------------------------------------------------------------------------------------
// Creando repositorio

// gulp.task('init', function(){
//   git.init(function(err){
//       if(err) throw err;
   
//       console.log("Repositorio inicializado.");
//   });
// });

// gulp.task('addremote', function(){
//   git.addRemote('origin', json.repository.url, function(err){
//       if(err) throw err;
       
//       console.log("Repositorio remoto añadido correctamente.");
//   });
// });

// // Push inicial
// gulp.task('push_inicial', ['init', 'addremote'], function(){
//     git.push('origin', 'master', function(err){
//       if(err) 
//       {
//           console.log("err:"+err);
//           throw err; 
//       }
//     });
// });

//------------------------------------------------------------------------------------
//Actualizar repositorio

gulp.task('push', function(){
    gulp.src('')
        .pipe(shell([
        'git add .'+
        ';'+
        'git commit -m "Actualizando Gitbook"'+
        ';'+
        'git push origin master'
        ]));
});

//------------------------------------------------------------------------------------
// Instalar dependencias y recursos

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

//------------------------------------------------------------------------------------

gulp.task('default', function(){
    gulp.watch(['scripts/*', 'txt/**/*.md', 'book.json'], ['construir_gitbook']); 
});