const { User, validate } = require('../models/user');
const { Subject } = require('../models/subject');
const { Vote } = require('../models/vote');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/listUsers', async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.get('/listSubjects', async (req, res) => {
  const subjects = await Subject.find().populate({ path: 'user' }).exec()
  res.send(subjects);
});

router.delete('/user/:idUser', async (req, res) => {
  const subs = await Subject.find({ user: req.params.idUser }).populate({ path: 'user' }).exec();
  for (let i = 0; i < subs.length; i++) {
    const vote = await Vote.deleteMany({ subject: subs[i]._id });
  }
  const user = await User.findByIdAndRemove(req.params.idUser);
  const subject = await Subject.deleteMany({ user: req.params.idUser });
  res.send({ 'message': 'ok' });
});



router.delete('/subject/:idSubject', async (req, res) => {
    const vote = await Vote.deleteMany({ subject: req.params.idSubject }).populate({ path: 'user' }).exec();
    const subject = await Subject.findByIdAndRemove(req.params.idSubject);
    const user = await User.update({ subjects: req.params.idSubject }, { $pullAll: { subjects: [req.params.idSubject] } })

  res.send({ 'message': 'ok' });
});

module.exports = router;
