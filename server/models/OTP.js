const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 5 * 60 // OTP expires after 5 minutes
    }
});

//a funtion to send email
async function sendVerificationEmail(email, otp) {
    // Implementation for sending verification email
    try{
        const mailResponse = await mailSender(email, "Verification Email from Studify", `<p>Your OTP is: <b>${otp}</b></p>`);
        console.log("Verification email sent successfully:", mailResponse);
    }
    catch(error){
        console.error("Error while sending verification email:", error.message);
        throw error;
    }
}

OTPSchema.pre('save', async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP', OTPSchema);
