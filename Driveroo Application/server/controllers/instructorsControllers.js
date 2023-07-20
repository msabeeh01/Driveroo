const Instructor = require('../models/Instructor');

exports.getInstructorById = async (req, res) => {
  const { id } = req.params;

  try {
    const instructor = await Instructor.findById(id);

    if (!instructor) {
      return res.status(404).send({ message: 'Instructor not found' });
    }

    res.send({ name: instructor.name, email: instructor.email });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


