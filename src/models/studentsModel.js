const mongoose = require("mongoose");
const {regexpToText} = require("nodemon/lib/utils");

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
    phone: {
        type: String,
        validate: {
            validator: function (value){
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value)
            },
            message: "Invalid Bangladeshi Mobile Number"
        },
        trim: 0
    },
    age: {
        type: Number,
        min: [6, `Minimum number can be 6, but you provide {VALUE}`],
        max: [30, 'Maximum number can be 30, but you provide {VALUE}']
    },
    remarks: {
        type: String,
        trim: true,
        default: "Student"
    }
}, {
    timestamps: true,
    versionKey: false
})
   const studentsModel = mongoose.model("students", studentSchema);

module.exports = studentsModel;