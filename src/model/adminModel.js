const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema( {
    emailId: String,
    password:String
}, { timestamps: true })


module.exports = mongoose.model("Admin", adminSchema)