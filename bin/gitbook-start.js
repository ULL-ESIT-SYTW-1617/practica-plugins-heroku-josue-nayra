#!/usr/bin/env node
"use strict"

const path = require('path');
const basePath = process.cwd();
const myArgs = require('minimist')(process.argv.slice(2));
const creacion = require(path.join(__dirname,'../src/creacion_gitbook.js'));
const json = require(path.join(__dirname,'../package.json'));
const fs = require('fs-extra');

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
            const packagejson = require(path.join(basePath, 'package.json'));
            console.log("Desplegando en... "+myArgs.deploy);
            var dependencias = packagejson.dependencies;
            // var dependencia_buscada;
            
            for (var d in dependencias){
                if(d.search(myArgs.deploy) != -1){
                    // dependencia_buscada = d;  
                    // var tarea_gulp = `\n\ngulp.task("deploy-${myArgs.deploy}", function(){`+
                    //          `\n       require("${dependencia_buscada}").deploy("${myArgs.IP}", "${myArgs.path}", "${packagejson.repository.url}", "${myArgs.usuarioremoto}");`+
                    //          `\n});`;     
                    // fs.appendFile(path.join(basePath,'gulpfile.js'), `${tarea_gulp}`, (err) => {
                    //   if (err) throw err;
                    //     console.log("Escribiendo tarea en gulpfile para próximos despliegues");        
                    // });
                    
                    // require(d).deploy(myArgs.IP, myArgs.path, packagejson.repository.url, myArgs.usuarioremoto);
                    require(d).initialize(myArgs.IP,myArgs.path,packagejson.repository.url,myArgs.usuarioremoto);
                    break;
                }
            }
        

        }
        else
        {
            creacion.crear_gitbook();   
        }
    }
}
