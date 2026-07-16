const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        trim: true,
    },
    courseDescription:{
        type: String,
        trim: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn:{
        type: String,
    },
    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    price:{
        type: Number,
        required: true
    },
    tag:{
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    thumbnail:{
        type: String,
    },
    studentsEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
});

mongoose.exports = mongoose.model('Course', courseSchema);