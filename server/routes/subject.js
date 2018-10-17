const { User } = require('../models/user');
const { Subject } = require('../models/subject');
const { Vote } = require('../models/vote');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const subjects = await Subject.find().populate({ path: 'user' }).exec()
  res.send(subjects);

});

router.get('/:idSub', async (req, res) => {
  const subject = await Subject.findById(req.params.idSub)
    .populate({
      path: 'votes',
      select: 'text user'
    })
    .exec()
  res.send(subject);
});

router.post('/:idUser', async (req, res) => {
  req.body['user'] = req.params.idUser;
  let subject = new Subject(req.body);
  subject = await subject.save();
  //User.comparePassword(req.body.password)
  await User.findByIdAndUpdate(req.params.idUser, { $addToSet: { subjects: subject._id } }).exec()
  res.send(subject);
});

router.delete('/:idSubject', async (req, res) => {
  Subject.findByIdAndRemove(req.params.idSubject, (err, sub) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "subject successfully deleted",
        id: sub._id
    };
    return res.status(200).send(response);
});
});

module.exports = router;
