const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DATABASE_NAME}.ucz7mht.mongodb.net/${process.env.COLLECTION}`

const database = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log("database connected")
    ).catch(err => {
        console.log("error")
        console.log(`something went wrong=>${err}`)
    })
}
module.exports = database