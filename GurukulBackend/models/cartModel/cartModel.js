const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    count:{
        type:Number,
        default:1
    }
});

const cart = mongoose.model("cart", CartSchema);
module.exports = cart;