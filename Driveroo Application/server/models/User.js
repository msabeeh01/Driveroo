const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String,required: [true, 'Must have a username'], unique: [true, 'Username already exists'], trim: true},
  password: {type: String, required: true, minlength: [8, 'Password must be at least 8 characters long'], validate: [
    {validator: val=>{
      if(!val.match(/[A-Z]/g))
        throw new Error('Password must contain at least one uppercase letter');
      if(!val.match(/[a-z]/g))
        throw new Error('Password must contain at least one lowercase letter');
      if(!val.match(/[0-9]/g))
        throw new Error('Password must contain at least one digit');
      if(!val.match(/[^A-Za-z0-9]/g))
        throw new Error('Password must contain at least one special character');
      return true;
    },
    message: "{PATH} validation failed: {MESSAGE}"
  }]},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: [true, 'Email is required'], unique: [true, 'Email already exists'], match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email']},
  phoneNum: {type: String},
  payments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}],
  isStudent: {type: Boolean},
  biography: {type: String},
  hours: {type: String},
  requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
  firebaseUID: {type: String}
});

UserSchema.pre('save', function(next) {
  if (!this.isStudent) {
    this.biography = 'Enter your biography here';
    this.hours = 'Enter your hours here';
  }
  next();
});

module.exports = UserSchema;
