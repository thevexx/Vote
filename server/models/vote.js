const mongoose = require('mongoose');
const userSchema = require('./user');

const voteSchema = new mongoose.Schema({

  text: {type:String, require : true},
  date: {type: Date,default:Date.now()},
   user: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
});
const Vote = mongoose.model('Vote', voteSchema);//class

module.exports.Vote = Vote;

