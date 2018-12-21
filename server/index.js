const express = require('express');
const errors = require('http-errors');
const path = require('path');
const logger = require('morgan');
const app = express();

// Configuraciones
const { db } = require('./database');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, '../ui/public')));

Routes
app.use('/', require('./routes/site.routes'));
app.use('/api/role', require('./routes/role.routes'));
app.use('/api/person', require('./routes/person.routes'));

View engine set-up
app.set('views', path.join(__dirname, '../ui/views'));
app.set('view engine', 'ejs');

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(errors(404));
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
