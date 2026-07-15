const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    accountType:{
        type: String,
        required: true,
        enum: ['Admin', 'Student', 'Instructor'],
        default: 'Student'
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Profile"
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    image:{
        type: String,
    },
    token:{
      type: String,  
    },
    resetPasswordExpires:{
        type: Date,
    },
    courseProgress:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }]
});

mongoose.exports = mongoose.model('User', userSchema);