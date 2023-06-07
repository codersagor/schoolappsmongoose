const express = require('express');
const {
    home,
    getAllStudent,
    addStudent,
    singleStudent,
    deleteStudent,
    updateStudent,
    testRoutes
} = require("../controllers/studentControllers");

const router = express.Router();

// First get route
router.get('/', home);
router.get('/home', home);

// Mongoose Route
router.post('/student', addStudent);
router.get('/student', getAllStudent);
router.get('/student/:id', singleStudent);
router.delete('/student/:id', deleteStudent);
router.put('/student/:id', updateStudent);
router.get('/test/:id', testRoutes);

module.exports = router;