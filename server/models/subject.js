const mongoose = require('mongoose');
const userSchema = require('./user');

const subjectSchema = new mongoose.Schema({

  title: String,
  description: String,
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  options: [String],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref :'Vote'
  }]

});

subjectSchema.method = () => {}
const Subject = mongoose.model('Subject', subjectSchema);//class

 module.exports.Subject = Subject;

