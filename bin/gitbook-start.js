#!/usr/bin/env node

const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const basePath = process.cwd();
const myArgs = require('minimist')(process.argv.slice(2));
const json = require('./package.json');
var directorio;
var autor;
var url_repo;
var nombre_gitbook;
var url_wiki;
var url_bugs;

if(myArgs.h || myArgs.help || myArgs <= 1)
{
    console.log("Seccion de ayuda.");
    console.log("Comando: gitbook-start [options]");
    console.log("Opciones disponibles:");
    console.log("-d <directorio en el que se desplegara el gitbook>");
    console.log("--autor <autor del gitbook>");
    console.log("--name <nombre del gitbook>");
    console.log("--url <url del repositorio>");
}
else
{
    
    //Comprobando las opciones
    directorio = myArgs.d || myArgs.name || 'Mi libro';
    autor = myArgs.autor || "Usuario";
    nombre_gitbook = myArgs.name || myArgs.d || myArgs.autor || "Mi libro";
    
    if(myArgs.url)
    {
        url_repo = myArgs.url;
        url_wiki = myArgs.url.split(".git")[0].concat('.wiki.git');
        url_bugs = myArgs.url.split(".git")[0].concat('/issues');
        // console.log("Split:"+url_wiki);
    }
    else
    {
        //Aqui podriamos crear un repo a través de la api de github
        url_repo = " ";
        url_wiki = " ";
        url_bugs = " ";
    }
    
    fs.mkdirp(path.join(basePath, directorio), function(err){
        if(err){
            console.error(err);
        }
        else{
    
          fs.copy(path.join(__dirname,'../template','gulpfile.js'), path.join(basePath, directorio , 'gulpfile.js'));
    
          fs.copy(path.join(__dirname,'../template','README.md'), path.join(basePath, directorio , 'README.md'));   
    
          fs.copy(path.join(__dirname, '../template', 'VERSION'), path.join(basePath, directorio , 'VERSION'));   
           
          fs.mkdirp(path.join(basePath, directorio , 'scripts'), function (err) {
              if (err) {
                console.error(err);
              }
          });
           
            fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(basePath, directorio ,'scripts'), function(err){
                if(err) return console.error(err)
            });  
           
          fs.mkdirp(path.join(basePath, directorio , '/txt'), function (err) {
              if (err) {
                console.error(err);
              }
              else {
    
                fs.copy(path.join(__dirname, '../template', 'txt' , 'SUMMARY.md'), path.join(basePath, directorio , 'txt', 'SUMMARY.md'));
    
                fs.copy(path.join(__dirname,'../template', 'txt', 'section1'), path.join(basePath, directorio , 'txt', 'section1'), function(err){
                    if(err) return console.error(err)
    
                });   
                
                ejs.renderFile(path.join(__dirname, '../template', 'txt', 'README.ejs'), { name_gitbook: nombre_gitbook}, function(err,str) {
                  if(err) {
                      console.error(err);
                      throw err;
                  }
                  else {
                      if(str) {
    
                          //Creamos y escribimos en el fichero README.md
                          fs.writeFile(path.join(basePath, directorio ,'txt', 'README.md'), str);
                      }
                  }
                });
    
              }
            });
        }
    });
    
    // Construyendo "package.json"
    
    ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'), { autor: autor , name_gitbook: nombre_gitbook, url: url_repo, url_bugs: url_bugs, url_wiki: url_wiki}, function(err,str){
        if(err) {
            console.error("ERROR:"+err);
        }
        if(str) {
            
            fs.writeFile(path.join(basePath, directorio , 'package.json'), str);
        }
        
    });
    
    // Construyendo "book.json"
    
    ejs.renderFile(path.join(__dirname, '../template', 'book.ejs'), { name_gitbook: nombre_gitbook}, function(err,str){
        if(err) {
            console.error("ERROR:"+err);
        }
        if(str) {
    
            fs.writeFile(path.join(basePath, directorio , 'book.json'), str);
    
        }
        
    });
}
