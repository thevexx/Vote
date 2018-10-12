const { Vote} = require('../models/vote');
const { User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const votes = await Vote.find();
  res.send(votes);
});

router.post('/', async (req, res) => {

  let vote = new Vote({ text: req.body.text});
  vote = await vote.save();
  res.send(vote);
});

/*routes.post('/', async (req, res) => {
  connection(async (db) => {
    const result = await db.collection('users').findOne({ email: req.body.email })
    if (!result) { res.send({ message: "user not found" }) }
    if (result.password !== req.body.password) { res.send({ message: "bad password" }) }
    //result.password = '';
    res.send({ message: 'ok', userToken: jwt.sign({ data: result }, 'my_secrettttt') })
  global.token =userToken;
  })
})*/




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
