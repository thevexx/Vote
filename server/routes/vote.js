const { Vote } = require('../models/vote');
const { User } = require('../models/user');
const { Subject } = require('../models/subject');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const votes = await Vote.find();
  res.send(votes);
});

router.get('/:idUser/:idSub', async (req, res) => {
  const vote = await Vote
    .findOne({
      'user': req.params.idUser,
      'subject': req.params.idSub
    })
  if (vote !== null) {
    res.send({'exist':true, 'text': vote.text});
  } else {
    res.send({'exist':false});
  }
});

router.post('/:idUser/:idSub', async (req, res) => {

  req.body['user'] = req.params.idUser;
  req.body['subject'] = req.params.idSub;
  let vote = new Vote(req.body);
  vote = await vote.save();
  console.log(vote);
  console.log(vote._id);
  //User.comparePassword(req.body.password)
  vote = await Subject.findByIdAndUpdate(req.params.idSub, { $addToSet: { votes: vote._id } }).exec()
  res.send(vote);
});



module.exports = router;
