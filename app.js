const express = require('express');
const app = express();
const manager = require('./router/routerManager');
const formData = require("express-form-data");
const session = require('express-session')
const mongo = require('./database/mongo')
const bodyParser = require('body-parser')
const cors = require('cors');
const options = {
  origin: 'http://localhost:3000'
  }
  
app.use(cors(options))
app.use(express.json());


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
