var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var exec = require('child_process').exec;



app.set('port', process.env.PORT || 8080);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(expressLayouts);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'gh-pages')));


app.get('/', function(request, response) {
  response.send('index');  
});

// app.post('/sync', function(request, response) {
//         function puts(error, stdout, stderr) {
//           console.log("Salida:"+stdout);
//           if(error) console.log("Error:"+error);
//          }
//   exec('git clone https://github.com/ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-josue-nayra.git'); 
//   exec("git pull https://github.com/ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-josue-nayra.git master", puts);
//   response.redirect('/');
// }); 

app.listen(app.get('port'), function() {
  console.log('Puerto utilizado:'+app.get('port'));
});

module.exports = app;