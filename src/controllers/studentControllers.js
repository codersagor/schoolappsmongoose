const studentModel = require('../models/studentsModel');

exports.home = function (req, res) {
 res.status(200).json({msg: "Home Page"})
}

// Add Single Student
exports.addStudent = async function  (req, res, next) {
    // Get Data from Body
  const rechiveData = req.body;

   // Send Data to Database
  await studentModel.create(rechiveData)
      .then(() => {res.status(201).json({msg: "Data Inserted"})})
      .catch((err) => {
          res.status(200).json({msg: "Data Insert Failed"})
      });
}

// Get All Students
exports.getAllStudent = async function (req, res, next) {
    let students = await studentModel.find({});
    res.status(200).send(students);
}

// Get a single Students
exports.singleStudent = async (req, res, next) => {

    const id = req.params.id;
    let singleStudent = await studentModel.findOne({_id: id});
    res.status(200).json({singleStudent});
}

// Delete a single Student
exports.deleteStudent = async (req, res, next) => {
    // Get Student id
    const id = req.params.id;

    // Delete a single student
    await studentModel.deleteOne({_id: id}).then(()=> {
        res.status(200).json({msg: "Student deleted"});
    }).catch((err) => {
        res.status(200).json({msg: "Student deleted failed"});
    });
}

// Update Student
exports.updateStudent = async (req, res, next) => {
    let id  = req.params.id;
    let Query = { _id: id }
    let updates = req.body;

    await studentModel.updateOne( Query, updates).then(()=> {
            res.status(200).json({msg: "Data Updated"})
        }).catch(err => {
            console.log('Update Failed')
        })
}