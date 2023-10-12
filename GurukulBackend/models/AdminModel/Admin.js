const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email:{
        type:String,
        default:"",
        required: true,
        unique: true
    },
    password:{
        type:String,
        default:"",
        required:true,
        min:6,
    }
},
{
    timestamps: true,
})

const admin = mongoose.model("admin", AdminSchema);
module.exports = admin;