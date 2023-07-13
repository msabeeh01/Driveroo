const TestInstructor = require('../models/TestInstructorModel')


const findAllInstructors = async (req,res) => {
    try {
        const instructors = await TestInstructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const createInstructor = async (req,res) => {
    const {name} = req.body;
    try {
        const newInstructor = new TestInstructor({name});
        await newInstructor.save();
        res.status(201).json(newInstructor);
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern.name === 1) {
            res.status(404).json({ message: 'Name must be unique' });
          } else {
            res.status(400).json({ message: error.message });
          }
    }
}


module.exports = {
    findAllInstructors,
    createInstructor
}