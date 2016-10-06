//http://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-node-js
// https://www.npmjs.com/package/ncp

const myArgs = require('minimist')(process.argv.slice(2));
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

// var ncp = require('ncp').ncp;

fs.mkdirp('./'+`${myArgs.d}`, function(err){
    if(err){
        console.error(err);
    }
    else{
       fs.copy('./template/gulpfile.js', './'+`${myArgs.d}`+'/gulpfile.js');
       fs.copy('./template/README.md', './'+`${myArgs.d}`+'/README.md');   
       fs.copy('./template/VERSION', './'+`${myArgs.d}`+'/VERSION');   
       
       fs.mkdirp('./'+`${myArgs.d}`+'/scripts', function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("Construyendo scripts ok");
          }
       });
    //   ncp('./template/scripts','./'+`${myArgs.d}`+'/scripts',function(err)
    //   {
    //       if(err) 
    //       {
    //           return console.error(err);    
    //       }
    //   });
       
        fs.copy('./template/scripts', './'+`${myArgs.d}`+'/scripts', function(err){
            if(err) return console.error(err)
            console.log("Scripts copiada!");
        });  
       
       fs.mkdirp('./'+`${myArgs.d}`+'/txt', function (err) {
          if (err) {
            console.error(err);
          }
          else {
            console.log("Construyendo txt ok");
            fs.copy('./template/txt/SUMMARY.md', './'+`${myArgs.d}`+'/txt/SUMMARY.md');
            fs.copy('./template/txt/section1', './'+`${myArgs.d}`+'/txt/section1', function(err){
                if(err) return console.error(err)
                console.log("Secion1 copiada!");
            });   
            
            ejs.renderFile('./template/txt/README.ejs', { name_gitbook: `${myArgs.name}`}, function(err,str) {
               if(err) {
                   console.error(err);
                   throw err;
               }
               else {
                  if(str) {
                    //   console.log(str);
                      //Creamos y escribimos en el fichero README.md
                      fs.writeFileSync('./'+`${myArgs.d}`+'/txt/README.md', str);
                  }
               }
            });
          }
        });
    }
});

ejs.renderFile('./'+'template/'+'/package.ejs', { autor: `${myArgs.autor}` , name_gitbook: `${myArgs.name}`, url: `${myArgs.url}`, url_bugs: `${myArgs.url}`, url_wiki: `${myArgs.url}`+'.wiki.git'}, function(err,str){
    if(err) {
        console.error("ERROR:"+err);
    }
    if(str) {
        // console.error("STR:"+str);
        // fs.writeFileSync('./'+`${myArgs.d}`+'/package.json', str);
        fs.writeFileSync('./'+`${myArgs.d}`+'/package.json', str);

    }
    console.log("Renderfile ok");
});
