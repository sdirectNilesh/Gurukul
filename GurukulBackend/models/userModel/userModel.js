const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        role: {
            type: String,
            required: true,
            
        },
        isDeletedAt: {
            type: Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
);
const user = mongoose.model("user", UserSchema);
module.exports = user;