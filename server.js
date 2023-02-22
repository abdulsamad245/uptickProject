import mongoose from "mongoose";
var express = require('express');
const cors = require('cors');
require("dotenv").config();
// const expressValidator = require('express-validator');
var app = express();
const bodyParser = require('body-parser');
// var db = require('./db');
global.__root   = __dirname + '/';

// const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://abdulsamadbalogun25:uptickproject@cluster0.lkyincn.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
// //   const collection = client.db("test").collection("devices");
//   if (!err) console.log("connected!");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useMongoClient: true
})
.then(() => console.log("Connected"))
.catch((err) => {console.log({err})});
console.log("init.......................... db");

app.use(cors());
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: false}));
const noteRoutes = require('./routes/notes-route');
const authContollers = require('./auth/AuthController');

app.use('/api/auth', authContollers);
app.use('/api/v1/', noteRoutes);

// const port = 8005 || 9040;

// app.listen(port, () => {console.log(`Server -> ${port}`)});

module.exports = app;

// var app = require('./app');
var port = process.env.PORT || 8001;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
