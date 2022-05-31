'use strict';

const express = require("express");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const dotenv = require('dotenv').config();
// const sessions = require('express-sessions');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local');
const app = express();
// const bcrypt = require('bcrypt');
const auth = require("./auth.js");
const htmlRoutes = require("./routes/htmlRoutes/htmlRoutes");
const bookRoutes = require("./routes/apiRoutes/apiRoutes")


fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(__dirname + '/public'));
// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

let user = require('./models/User.model');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());





mongoose.connect(process.env.DB, { useUnifiedTopology: true }, (err, db) => {
  // db = db.db('PersonalLibrary');
  console.log('Mongoose Connected');
  if (err) {
    console.log('Database Error: ' + err);
  } else {
    console.log('Database Connection Successful...');

    bookRoutes(app, db)
    auth(app, db);
    htmlRoutes(app, db);

    console.log("I'm over here")

  }
})


//Start our server and tests!
app.listen(process.env.PORT || 8080, function () {
  console.log("Listening on port " + process.env.PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        // runner.run();
      } catch (e) {
        let error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for unit/functional testing
