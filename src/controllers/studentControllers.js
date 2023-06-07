const studentModel = require('../models/studentsModel');

exports.home = function (req, res) {
 res.status(200).json({msg: "Home Page"})
}

// Add Single Student
exports.addStudent = async function  (req, res, next) {
    // Get Data from Body
  const receiveData = req.body;

   // Send Data to Database
  await studentModel.create(receiveData)
      .then((results) => {res.status(201).json({msg: "Data Inserted", results: results})})
      .catch((err) => {
          res.status(200).json({msg: "Data Insert Failed", error: err  })
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
   await studentModel.findOne({ _id: id }, {createdAt: 0, updatedAt: 0})
        .then(results => {
            res.status(200).json({results});
    })
        .catch(err => {
            res.status(200).json({msg:"Student Dont Found", Error: err});
        })
}

// Delete a single Student
exports.deleteStudent = async (req, res, next) => {
    // Get Student id
    const id = req.params.id;

    // Delete a single student
    await studentModel.deleteOne({ _id: id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ msg: "Student not found" });
            }
            res.status(200).json({ msg: "Student deleted" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Student deletion failed", err});
        });
}

// Test Rotues
exports.testRoutes = async (req, res, next) => {
    // Get Student id
    const id = req.params.id;
    // Delete a single student
    await studentModel.deleteOne({ _id: id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ msg: "Student deletion failed", err});
        });
}

// Update Student
exports.updateStudent = async (req, res, next) => {
    let id  = req.params.id;
    let Query = { _id: id }
    let updates = req.body;

    await studentModel.updateOne( Query, updates).then((results)=> {
        console.log(results)
            res.status(200).json({msg: "Data Updated", data: updates})
        }).catch(err => {
            console.log('Update Failed')
        })
}