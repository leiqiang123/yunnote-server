const mongoose = require('mongoose');

var category = new mongoose.Schema({
    name: {
        type:String,
        unique:true
    }
},{versionKey:false});

module.exports = mongoose.model('category',category)