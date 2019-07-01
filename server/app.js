var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');


var app = express();

var todoRouter = require('./routes/todo');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var Datastore = require('nedb');
var db =  new Datastore({ filename: './database/database', autoload: true });


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cookieParser());

app.use((req, res, next) => {
  db.loadDatabase();
  req.db = db;
  next();
});

app.use('/todo', todoRouter);

module.exports = app;
