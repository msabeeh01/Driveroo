const mongoose = require('mongoose');

//region user-related Schemas
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
  requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}]
});

UserSchema.pre('save', function(next) {
  if (!this.isStudent) {
    this.biography = 'Enter your biography here';
    this.hours = 'Enter your hours here';
  }
  next();
});

const PaymentSchema = new mongoose.Schema({
  payer: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
  payee: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
  accountType: {type: String, required: true},
  accountNum: {type: String, required: true},
  amount: {type: Number, required: true},
  transactionTime: {type: Date, required: true},
  transactionReason: {type: String},
});

const StudentSchema = new mongoose.Schema({
  isStudent: {type: Boolean , default: true},
  sessionList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
  requestList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
});

const InstructorSchema = new mongoose.Schema({
  isInstructor: {type: Boolean , default: true},
  sessionList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
  requestList: [{type: mongoose.Schema.Types.ObjectId,ref: 'Request'}],
});
//endregion

//region Communication-related schemas
const SessionSchema = new mongoose.Schema({
  associatedStudent: {type: mongoose.Schema.Types.ObjectId,ref: 'Student'},
  associatedInstructor: {type: mongoose.Schema.Types.ObjectId,ref: 'Instructor'},
  sessionStartDate: {type: Date, required: true},
  contents: [{type: mongoose.Schema.Types.ObjectId,ref: 'Chat'}],
});

const RequestSchema = new mongoose.Schema({
  associatedStudent: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  associatedInstructor: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  requestDate: {type: Date, required: true},
  requestContent: {type: String, required: true},
  requestStatus: {type: String, required: true},
});

const ChatSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  receiver: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  message: {type: String, required: true},
  sendTime: {type: Date, required: true},
  readTime: {type: Date},
});
//endregion

//region Models
const User = mongoose.model('User', UserSchema);
const Payment = mongoose.model('Payment', PaymentSchema);
const Student = User.discriminator('Student', StudentSchema);
const Instructor = User.discriminator('Instructor', InstructorSchema);
const Session = mongoose.model('Session', SessionSchema);
const Request = mongoose.model('Request', RequestSchema);
const Chat = mongoose.model('Chat', ChatSchema);
//endregion

module.exports = { User, Payment, Student, Instructor, Session, Request, Chat };