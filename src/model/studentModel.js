const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema( {
    name: String,
    subject:String,
    marks:Number,
    total:Number,
    isDelete:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema)