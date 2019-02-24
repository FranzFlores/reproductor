'use strict'
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var flash = require('connect-flash');
const passport = require('passport');
const { Role,User} = require('./database');

//Inicializaciones
var app = express();
require('./lib/passport')(passport,User,Role);

//Configuraciones
app.set('port',process.env.PORT||4000);

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs', 
    helpers: require('./lib/handlebars').helpers
}))
app.set('view engine','hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
    secret:'reproductor',
    resave: true,
    saveUninitialized: false
}));
app.use(flash(app));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    app.locals.account = req.isAuthenticated();
    next();
  });

//Rutas
app.use(require('./routes/user'));
app.use('/api',require('./routes/report'));
app.use('/api',require('./routes/album'));
app.use('/api',require('./routes/artist'));
app.use('/api',require('./routes/playList'));
app.use('/api',require('./routes/song'));

//Public 
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});

module.exports = app; //Se puede usar express en otras ficheros q incluyan app
