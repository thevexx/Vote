const mongoose = require('mongoose');
const userSchema = require('./user');

const subjectSchema = new mongoose.Schema({

  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  options: [String],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
});

subjectSchema.pre('remove', async function (next) {
  console.log('delete en cours');
  subject.remove(function (err, subject) {
    if (err) return handleError(err);
    Subject.findById(subject._id, function (err, subject) {
      console.log(subject) // null
    })
  })

  next()
});

subjectSchema.method = () => { }
const Subject = mongoose.model('Subject', subjectSchema);//class

module.exports.Subject = Subject;

