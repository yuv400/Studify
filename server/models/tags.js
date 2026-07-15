const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: Number,
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }
});

mongoose.exports = mongoose.model('Tag', tagsSchema);