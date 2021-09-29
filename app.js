var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

require('dotenv').config();

// Configuracion de mongodb
const mongosee= require('mongoose');

// Mongodb desplegado

const uri  = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fj6zb.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongosee.connect(uri,{ useNewUrlParser:true, useUnifiedTopology: true }).
  then(()=>(console.log("Conectado correctamente"))).
  catch(e => (console.log("Error en la conexion",e)));

// Local
// let mongoDB = 'mongodb://127.0.0.1:27017/appnode';
// Conexion a la base de datos
// mongosee.connect(mongoDB);
// mongosee.Promise = global.Promise;
// let db = mongosee.connection;
// db.on('error',console.error.bind(console,'Error al conectar base de datos'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
hbs.registerPartials(path.join(__dirname + '/views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// bootstrap 5
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/js',express.static(__dirname+'/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/jquery/dist'))


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;