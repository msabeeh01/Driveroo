const express = require('express');

const instructors = []

for (let i = 1; i <= 16; i++) {
    instructors.push({
      id: i,
      name: `Instructor ${i}`,
    });
  }

const sendInstructors = (req,res) =>{
    res.send(instructors)
}

module.exports = {
    sendInstructors
}