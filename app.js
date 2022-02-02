const express = require('express');
const app = express();
const manager = require('./router/routerManager');
const formData = require("express-form-data");
const session = require('express-session')

const bodyParser = require('body-parser')
const mongoDb = require('./database/mongo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))





manager(app)
app.listen(2000,() => {
    console.log("System running");
})
