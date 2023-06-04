const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    roll: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    class: {
        type: String,
        enum: ["one", "two", "three", "four", "five", "six", "seven", "eight","nine","ten"],
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 6,
        max: 30
    },
    remarks: {
        type: String,
        trim: true,
        default: "Student"
    }
})
   const studentsModel = mongoose.model("students", studentSchema);

module.exports = studentsModel;