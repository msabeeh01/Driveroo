const {User, Request } = require('../models/ModelOne');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWTSECRET = process.env.JWTSECRET

const getIdFromToken = async (req) => {
  const token = req.headers.authorization
  if (token) {
    const whatever = token.split(" ")[1]
    const {_id} = await jwt.verify(whatever, JWTSECRET)
    return _id
  } else {
    throw new Error('Token not found')
  }

}


const makeNewRequest = async (req, res) => {
    const _id = await getIdFromToken(req)
    var {associatedInstructor, requestDate, requestContent, requestStatus} = req.body

    requestStatus = "Pending"
    requestDate = Date.now()
    requestContent = "I would like to request a session with you"

    try{
        const instructor = await User.findById(associatedInstructor)

        if(instructor.requests.includes(_id)){
            throw new Error('Request already exists')
        }

        const newRequest = await Request.create({
            associatedStudent: _id,
            associatedInstructor: instructor._id,
            requestDate,
            requestContent,
            requestStatus
        })
        //find if student _id is already in instructor.requests
        //if not, push it in
        //if yes, do nothing

        instructor.requests.push(_id)
        await instructor.save()
        res.send({instructor})
    }catch(err){
        res.status(400).send({message: err.message})
    }
    /**const RequestSchema = new mongoose.Schema({
  associatedStudent: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  associatedInstructor: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  requestDate: {type: Date, required: true},
  requestContent: {type: String, required: true},
  requestStatus: {type: String, required: true},
}); */
}

module.exports = {
    makeNewRequest
}