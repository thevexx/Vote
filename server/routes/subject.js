const {User} = require('../models/user');
const {Subject} = require('../models/subject');
const {Vote} = require('../models/vote');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const subjects = await Subject.find().populate({path:'user'}).exec()
  res.send(subjects);
});

router.get('/:idSub', async (req, res) => {
  const subjects = await Subject.findById(req.params.idSub).populate({path:'user', select: 'firstName'}).exec()
  res.send(subjects);
});

router.post('/:idUser', async (req, res) => {
  req.body['user'] = req.params.idUser;
  let subject = new Subject(req.body);
  subject = await subject.save();
  //User.comparePassword(req.body.password)
  await User.findByIdAndUpdate(req.params.idUser, {$addToSet:{subjects: subject._id}}).exec()
  res.send(subject);
});



router.post('/option/:idSubject', async (req, res) => {
  console.log(req.body.text);
  //User.comparePassword(req.body.password)
  await Subject.findByIdAndUpdate(req.params.idSubject, {$addToSet:{options: req.body.text}}).exec()
});


router.post('/vote/:idUser/:idSubject', async (req, res) => {
  console.log(req.body.text);
  req.body['user'] = req.params.idUser;
  let vote = new Vote(req.body);
  vote = await vote.save();
  //User.comparePassword(req.body.password)
  await Subject.findByIdAndUpdate(req.params.idSubject, {$addToSet:{votes:  vote._id}}).exec()
});

module.exports = router;
