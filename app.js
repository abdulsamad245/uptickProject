import mongoose from "mongoose";
var express = require('express');
const cors = require('cors');
require("dotenv").config();

var app = express();
const bodyParser = require('body-parser');
global.__root   = __dirname + '/';

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => console.log("Connected"))
.catch((err) => {console.log({err})});
console.log("init.......................... db");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const noteRoutes = require('./routes/notes-route');
const authContollers = require('./auth/AuthController');

app.use('/api/auth', authContollers);
app.use('/api/v1/', noteRoutes);

module.exports = app;

var port = process.env.PORT || 8001;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;

