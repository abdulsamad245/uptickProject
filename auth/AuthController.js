var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// var config = require('../config');
require("dotenv").config();
const { body, validationResult } = require('express-validator');
const LogEntry = require('../models/LogEntry');

function validateSignUp(){

    return [
        body('password', 'Password must be at least 8 characters long').isLength({min: 8}),
        body('email').custom(value => {return User.findOne({email: value}).then(user => {
            if (user)
                return Promise.reject('User with this email already exists!')
        })}),
        body('passwordConfirm').custom((value, {req}) => {
            if (value !== req.body.password){
                return Promise.reject("Passwords don't match")
            }
            return true;
        }),
        body(['firstName', 'lastName'], 'This field is required').notEmpty()
    ]
}

function validatePasswordChange() {
    return [
        body('password').custom((value, {req}) => {
            let hashedPassword = bcrypt.hashSync(value, 8);
            let user = req.user;
            if (!bcrypt.compareSync(req.body.password, user.password)){
                return Promise.reject("You've entered wrong password")
            }
            return true;
        }),
        body('newPassword').custom((value, {req}) => {
            if (value !== req.body.newPasswordConfirm){
                return Promise.reject("Passwords does not match");
            }
            return true;
        })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};

router.post('/login', function(req, res) {
    // console.log({req,"req1":req.body});
  User.findOne({ email: req.body.email }, function (err, user) {

    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    LogEntry.create({user: user, ipAddress: req.ip}, function (err, obj) {
        if (err)
            return res.status(500)
    });

    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', validateSignUp(), validate, function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashedPassword
      },
      function (err, user) {
        if (err) return res.status(500).json({errors: err});

        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).send({ auth: true, token: token });
      });
});

router.get('/profile', VerifyToken, function(req, res, next) {
// console.log(req);
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

router.post('/password-reset', VerifyToken, validatePasswordChange(),  function (req, res) {
    let user = req.user;
    let newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    user.password = newPassword;
    user.save(function (err) {
        if (err)
            return res.res(500).json({mesage: "Error occurred while changed password"});

        return res.status(200).json({message: 'Password changed'});
    });
});

module.exports = router;
