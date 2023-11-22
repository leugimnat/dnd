const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    api_key:String,
    userStatus:Number,
});


module.exports = mongoose.model('User', userSchema);