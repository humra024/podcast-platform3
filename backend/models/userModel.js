//to store different things, different models are used

const {model, Schema} = require('../connection') //importing only model and schema from connection

//schema is a class of mongoose to define structure
const mySchema = new Schema({     //object of Schema
    username: String,
    email: String,
    password: String
})

//model is a function to define the model
module.exports = model('user',mySchema)   //user is the name of collection (can be seen in mongodb)




