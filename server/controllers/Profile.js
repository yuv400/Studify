
//update profile -->as null already stored at time of signup
const Profile = require('../models/Profile');
const User = require('../models/User')

exports.updateProfile = async(req, res)=>{
    try {
        //get data
        const {dateOfBirth="",about="", contactNumber, gender} = req.body;

        //get userId
        const id = req.user.id

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId =userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profileDetails,
        })
    } 

    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}


//delete Account
//TODO : HOW CAN WE SCHEDULE THIS DELETION OPERATION AFTER SOME DAYS 
//TODO : CRON JOB

exports.deleteAccount = async(req, res) =>{
    try {
    //get user id
    const  id = req.user.id;

    //validation
    const userDetails = await User.findById(id);
    if(!userDetails){
        return res.status(404).json({
            success:false,
            message:'User not found',
        })
    }

    //delete profile
    await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})     //or directly await Profile.findByIdAndDelete(userDetails.additionalDetails)

    //TODO : unroll user from all enrolled courses


    //delete user 
    await User.findByIdAndDelete(id);

    //return response
    return res.status(200).json({
        success: true,
        message:'User deleted Successfully',
    })    
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'message cannot be deleted',
        })
    }
}


//get all user details
exports.getAllUserDetails = async (req, res) =>{
    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate('additionalDetails').exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User details canot be fetched',
        })
    }
} 