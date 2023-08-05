const mongoose = require('mongoose');

const UserSchema = require('./User');

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
