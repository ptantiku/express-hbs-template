/* ENV config */
const env = process.env.NODE_ENV || 'dev';
const port = process.env.APP_PORT || 3000;

/* imports */
const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const hbsHelpers = require('handlebars-helpers')

/* create express instance */
const app = express();

/* install Express plugins */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//logging
//app.use(logger('combined')); //use 'combined' format to stdout
/* app.use(  // logging with 'combined' format, into a file
  logger(
    'combined',
    {stream: fs.createWriteStream(path.join(__dirname, 'log/access.log'), {flags: 'a'})}
  )
);
*/

/* view engine */
const hbs = exphbs.create({defaultLayout: 'main', extname: 'hbs'});

//register handlebars helpers
hbsHelpers({ handlebars: hbs.handlebars });

//set *.hbs to be main view
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//static public folder
app.use(express.static(path.join(__dirname, 'public')));

//enable caching
app.enable('view cache');

/* routes */
require('./routes.js')(app)

//error route
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error when env='dev', show stack trace
if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


/* running */
app.listen(port);
console.log(`Running express server on port ${port}`);
