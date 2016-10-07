#!/usr/bin/env node

const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const basePath = process.cwd();
const myArgs = require('minimist')(process.argv.slice(2));


fs.mkdirp(path.join(basePath,`${myArgs.d}`), function(err){
    if(err){
        console.error(err);
    }
    else{

       fs.copy(path.join(__dirname,'../template','gulpfile.js'), path.join(basePath, `${myArgs.d}`, 'gulpfile.js'));

       fs.copy(path.join(__dirname,'../template','README.md'), path.join(basePath, `${myArgs.d}`, 'README.md'));   

       fs.copy(path.join(__dirname, '../template', 'VERSION'), path.join(basePath, `${myArgs.d}`, 'VERSION'));   
       
       fs.mkdirp(path.join(basePath, `${myArgs.d}`, 'scripts'), function (err) {
          if (err) {
            console.error(err);
          }
       });
       
        fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(basePath, `${myArgs.d}`,'scripts'), function(err){
            if(err) return console.error(err)
        });  
       
       fs.mkdirp(path.join(basePath, `${myArgs.d}`, '/txt'), function (err) {
          if (err) {
            console.error(err);
          }
          else {

            fs.copy(path.join(__dirname, '../template', 'txt' , 'SUMMARY.md'), path.join(basePath, `${myArgs.d}`, 'txt', 'SUMMARY.md'));

            fs.copy(path.join(__dirname,'../template', 'txt', 'section1'), path.join(basePath, `${myArgs.d}`, 'txt', 'section1'), function(err){
                if(err) return console.error(err)

            });   
            
            ejs.renderFile(path.join(__dirname, '../template', 'txt', 'README.ejs'), { name_gitbook: `${myArgs.name}`}, function(err,str) {
               if(err) {
                   console.error(err);
                   throw err;
               }
               else {
                  if(str) {

                      //Creamos y escribimos en el fichero README.md
                      fs.writeFile(path.join(basePath, `${myArgs.d}`,'txt', 'README.md'), str);
                  }
               }
            });

          }
        });
    }
});

// Construyendo "package.json"

ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'), { autor: `${myArgs.autor}` , name_gitbook: `${myArgs.name}`, url: `${myArgs.url}`, url_bugs: `${myArgs.url}`, url_wiki: `${myArgs.url}`+'.wiki.git'}, function(err,str){
    if(err) {
        console.error("ERROR:"+err);
    }
    if(str) {
        
        fs.writeFile(path.join(basePath, `${myArgs.d}`, 'package.json'), str);
    }
    
});

// Construyendo "book.json"

ejs.renderFile(path.join(__dirname, '../template', 'book.ejs'), { name_gitbook: `${myArgs.name}`}, function(err,str){
    if(err) {
        console.error("ERROR:"+err);
    }
    if(str) {

        fs.writeFile(path.join(basePath, `${myArgs.d}`, 'book.json'), str);

    }
    
});
