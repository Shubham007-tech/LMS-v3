// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
     return next();     //this inside the pre('save') function would refer to the user object.
  const salt = await bcrypt.genSalt(10);  
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/*
NOTES - When you define userSchema.pre(), you pass a regular (non-arrow) function. 
Regular functions in JavaScript have their own this context, which is determined by how they are called.
Since Mongoose calls this function when a document is saved, this is bound to the document.
*/

//matchPassword: A custom method
// Compare input password with the hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
