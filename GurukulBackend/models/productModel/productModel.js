const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('../userModel/userModel');

const ProductSchema = new Schema({
    product_name:{
        type:String,
    },
    stock:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    userId:{
        type:String,
        require:true,
        ref:user
    },
    brand:{
        type:String,
        require:true
    },
    isDeleted: { 
        type: Boolean, default: false 
    }
},
{
    timeStamps: true}
);

const product = mongoose.model("product", ProductSchema);
module.exports = product;