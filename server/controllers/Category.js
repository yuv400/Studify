const Category = require('../models/categories');

//create Tag handler function
exports.createCategory = async(req, res) =>{
    try {
        const {name, description} = req.body;
        
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        //create entry in DB
        const categoryDetails = await category.create({    //or Category
            name:name,
            description:description,
        })
        console.log(categoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:'Tag created Successfully',
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}


//get All Tags
exports.showAllcategories = async(req, res) =>{
    try{
        const allCategory = await Tag.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:'All Tags returned successfully',
            allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}