#!/usr/bin/env node
"use strict"

// const fs = require('fs-extra');
// const ejs = require('ejs');
const path = require('path');
const basePath = process.cwd();
const myArgs = require('minimist')(process.argv.slice(2));
const json = require(path.join(__dirname,'../package.json')); 
// const gitconfig = require('git-config');
const iaas = require('gitbook-start-iaas-ull-es-josue-nayra');
const creacion = require(path.join(__dirname,'../src/creacion_gitbook.js'));

// var directorio;
// var autor;
// var url_repo;
// var nombre_gitbook;
// var url_wiki;
// var url_bugs;


// switch(myArgs.help | myArgs.version | myArgs.deploy){
//     case myArgs.help:{
//         console.log("Seccion de ayuda.");
//         console.log("Comando: gitbook-start [options]");
//         console.log("Opciones disponibles:");
//         console.log("\t"+"-d <directorio en el que se desplegara el gitbook>");
//         console.log("\t"+"--autor <autor del gitbook>");
//         console.log("\t"+"--name <nombre del gitbook>");
//         console.log("\t"+"--url <url del repositorio>");
//         console.log("\t"+"--version");
//         console.log("\t"+"--deploy");
//         break;
//     }
//     case myArgs.version:{
//         console.log("Version:"+json.version);
//         break;
//     }
//     case myArgs.deploy:{
//         console.log("Deploy");
//         break;
//     }
//     default:{
        
//     }
// }


if(myArgs.h || myArgs.help)
{
    console.log("Seccion de ayuda.");
    console.log("Comando: gitbook-start [options]");
    console.log("Opciones disponibles:");
    console.log("\t"+"-d <directorio en el que se desplegara el gitbook>");
    console.log("\t"+"--autor <autor del gitbook>");
    console.log("\t"+"--name <nombre del gitbook>");
    console.log("\t"+"--url <url del repositorio>");
    console.log("\t"+"--version");
    console.log("\t"+"--deploy");
}
else
{
    if(myArgs.v || myArgs.version)
    {
        console.log("Version:"+json.version);
    }
    else
    {
        if(myArgs.deploy)
        {
            console.log("Deploy to Iaas.");
            
            var packagejson = require(path.join(basePath, 'package.json'));
            
            iaas.deploy(myArgs.IP, myArgs.path, packagejson.repository.url , myArgs.usuarioremoto);
        }
        else
        {
            creacion.crear_gitbook();   
        }
    }
}
