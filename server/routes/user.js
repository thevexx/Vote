const { User, validate } = require('../models/user');
const { Subject } = require('../models/subject');
const { Vote } = require('../models/vote');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/:idUser', async (req, res) => {
  const user = await User.findById(req.params.idUser)
    .populate({
      path: 'subjects',
      populate: { path: 'votes', select: 'text' }
    })

    .exec()
  res.send(user);
});

router.post('/register', async (req, res) => {

  // let user = new User({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password });
  user = await User.create(req.body);
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) { res.send({ message: 'user not found' }) }
  if (!user.comparePassword(req.body.password)) { res.send({ message: 'bad password' }) }
  res.send({ message: 'ok', userToken: jwt.sign({ data: user }, 'my_seeecreeeettt') });
});

router.delete('/:idUser/:idSubject', async (req, res) => {

  const sub = await User.update({ _id: req.params.idUser }, { $pullAll: { subjects: [req.params.idSubject] } })
  const subj = await Subject.findByIdAndRemove(req.params.idSubject);
  const vote = await Vote.deleteMany({subject: req.params.idSubject});

  res.send(sub, subj, vote);
  //if (!sub) { res.send({ message: 'subject not deleted' }) }
  //res.send({ message: 'ok'});
});


module.exports = router;
