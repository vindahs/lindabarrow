var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');

var generalRoutes = require('./routes/generalRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', generalRoutes);


app.post("/ajax/email", function(request, response) {
    // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: "transporterone2@gmail.com", // this should be YOUR GMAIL account
              pass: "school3school3" // this should be your password
          }
      });
  
      var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
      var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
      var mail = {
          from: "transporterone2@gmail.com", // sender address
          to: "tranportertwo@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
          subject: "Mail From Contact Form", // Subject line
          text: textBody,
          html: htmlBody
      };
  
      // send mail with defined transport object
      transporter.sendMail(mail, function (err, info) {
          if(err) {
              console.log(err);
              response.json({ message: "message not sent: an error occured; check the server's console log" });
          }
          else {
              response.json({ message: `message sent: ${info.messageId}` });
          }
      });
  });

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