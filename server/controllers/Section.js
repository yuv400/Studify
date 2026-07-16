const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require("../models/SubSection");

exports.createSection = async(req, res) =>{
    try {
        //data fetch
        const {sectionName, courseId} = req.body

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message:'Missing Properties'
            })
        }

        //create Section
        const newSection = await Section.create({sectionName});

        //update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                courseContent:newSection._id,
            }
            },
            {new: true})
            .populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

        //return response
        return res.status(200).json({
            success:true,
            message:'Section created Successfully',
            updatedCourseDetails,
        })
        
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'Unable to create Section, Please try again',
            error:error.message,
        })
    }
}

//update Section
exports.updateSection = async(req, res) =>{
    try {
        //data input
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message:'Missing Properties'
            })
        }

        //update data
        const section = awaitSection.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated Successfully',
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'Unable to create Section, Please try again',
            error:error.message,
        })
    }
}

//delete Section
exports.deleteSection = async(req, res) =>{
    try {
        //getId - assuming that we are sending id in params
        const {sectionId} = req.params;

        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO: do we need to delete the entry from course Schema [testing]

        //return response
        return res.json(200).json({
            success:true,
            message:'Section deleted Successfully',
        })
    } 
    catch (error) {
        return res.json(500).json({
            success:false,
            message:'Unable to delete Section, Please try again',
            error:error.message,
        })
    }
}