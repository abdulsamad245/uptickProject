var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('../config'); // get our config file
require("dotenv").config();
const User = require('../models/User');

function verifyToken(req, res, next) {
  // console.log(req);

  let token = req.headers['authorization'];
  // console.log({token});

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  let prefix = 'Bearer ';
  if (token.startsWith('Bearer ')){
    token = token.substr(prefix.length);
  }
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      req.user = user;
      next();
    });
  });

}

module.exports = verifyToken;
