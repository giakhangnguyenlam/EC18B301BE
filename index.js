const express = require('express')
const app = express()
const mongoose=require('mongoose');
const port = 3000;
const route=require('./src/routes/index');
const path = require('path');

const db=require('./src/config/db');
const { request } = require('http');

const session=require("express-session");
const MongoStore=require("connect-mongo");
const passport=require("passport");
const LocalStrategy=require("passport-local");


app.use(session({
  secret: "our-passport-local-strategy-app",
  store: MongoStore.create
  ({ mongoUrl: 'mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority' }),
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded(
  {
    extended:false
  }
));
//About login
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

db.connect();
route(app);

app.listen(process.env.PORT||port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })