const {model, Schema, Types} = require('../connection') //importing only model and schema from connection

//schema is a class of mongoose to define structure
const mySchema = new Schema({     //object of Schema
    title: String,
    description: String,
    genre: String,
    uploadedBy: {type : Types.ObjectId, ref: 'user'},
    createdAt: Date,
    thumbnail: String,
    audio: String,
    
})

//model is a function to define the model
module.exports = model('podcast',mySchema)   //user is the name of collection (can be seen in mongodb)

