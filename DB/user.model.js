const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Email:{type:String, required:true,unique:true},
    Name:{type:String}
})

const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel