const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/register', async (req, res) => {

  // let user = new User({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password });
  user = await User.create(req.body);
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({email:req.body.email});
  if(!user){res.send({message:'user not found'})}
  if(!user.comparePassword(req.body.password)){res.send({message:'bad password'})}
  res.send({message:'ok', userToken : jwt.sign({data:user},'my_seeecreeeettt')});
});

function isEmail(myVar) {
  var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
  return regEmail.test(myVar);
}

function isPassword(psw) {
  var validityPassword = "";
  //verify password
  if (psw.length < 8) {
    validityPassword = "Not Valid";
    //return false;
  } else {

    validityPassword = "bad";

    rea = /[a-z]/;
    reA = /[A-Z]/;
    if (rea.test(psw) && reA.test(psw)) {
      validityPassword = "normal";
    }

    re0 = /[0-9]/;
    rec = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
    if (re0.test(psw) && rec.test(psw)) {
      validityPassword = "good !";
    }
  }
  return validityPassword;
}

module.exports = router;
