//environment variables
require('dotenv').config();
const JWTSECRET = process.env.JWTSECRET;
const ALGORITHM = process.env.ALGORITHM

// UserSchema
const { User } = require('../models/ModelOne')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//generate token based on ID
const generateToken = (_id) => {
    return jwt.sign({ _id }, JWTSECRET, {algorithm: ALGORITHM, expiresIn: '1d' });
}

//encrypt password
const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

//signup functions
const signupStudent = async (req, res) => {
    const { email, password, firstname, lastname, username } = req.body;
    const isStudent = true;
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).send({ message: 'Password is required' });
    }
    if (!firstname) {
        return res.status(400).send({ message: 'First name is required' });
    }
    if (!lastname) {
        return res.status(400).send({ message: 'Last name is required' });
    }
    if (!username) {
        return res.status(400).send({ message: 'Username is required' });
    }
    try {
        const encryptedPassword = await encryptPassword(password);
        const newUser = new User({
            email,
            password: encryptedPassword,
            firstname,
            lastname,
            username,
            isStudent
        });
        //generate token
        const token = generateToken(newUser._id);
        //save user
        await newUser.save();
        //send token
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const signupInstructor = async (req, res) => {
    const { email, password, firstname, lastname, username } = req.body;
    const isStudent = false;
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).send({ message: 'Password is required' });
    }
    if (!firstname) {
        return res.status(400).send({ message: 'First name is required' });
    }
    if (!lastname) {
        return res.status(400).send({ message: 'Last name is required' });
    }
    if (!username) {
        return res.status(400).send({ message: 'Username is required' });
    }
    try {
        const encryptedPassword = await encryptPassword(password);
        const newUser = new User({
            email,
            password: encryptedPassword,
            firstname,
            lastname,
            username,
            isStudent
        });
        //generate token
        const token = generateToken(newUser._id);
        //save user
        await newUser.save();
        //send token
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//!login functions
const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email){
        return res.status(400).json({message: 'Email is required'});
    }
    if(!password){
        return res.status(400).json({message: 'Password is required'});
    }
    try{
        //find email
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        //compare password with encrypted password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid password'});
        }

        //generate token
        const token = generateToken(user._id);

        //return token
        res.status(200).json({token, user});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    signupStudent,
    signupInstructor,
    login
}