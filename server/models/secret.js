const mongoose = require('mongoose');

const secreteSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    categeory:{
        type:String,
        required:true,
        enum:["confession","work","relationship","random"],
        default:"random"
    },
    likes:{
        type:Number,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model("secrete",secreteSchema);