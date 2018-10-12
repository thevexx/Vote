const mongoose = require('mongoose');
const subjectSchema = require('./subject');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  password: String,
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }]
});



userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hashSync(this.password);
    next()
  }
});

userSchema.methods.comparePassword = function (userLoginPassword) {
  console.log(this)
  return bcrypt.compareSync(userLoginPassword, this.password);
};



const User = mongoose.model('User', userSchema);//class

module.exports.User = User;

