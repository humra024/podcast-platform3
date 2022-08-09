const express = require('express'); //req:shortcut to import package
const router=express.Router(); //router is imported from express so express also has to be imported in this file
const Model=require('../models/podcastModel')


//create or add
router.post('/pod',(req,res) => { //can be accessed only after user as the route has been specified in index.js- localhost:5000/podcast/pod
    console.log(req.body); //undefined as json from post is imported here in js
    
    //to save data in mongodb
    new Model(req.body).save()   //object of Model. .save() to save the data
    .then((result) => {
        console.log(result);
        res.json(result);          //data sent to client in the form of json
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });   
})

//to find. Method used is get
router.get('/getall',(req,res)=>{         //get all the data named getall
    Model.find({}).populate('uploadedBy')  //will find the data mentioned and return an array of the same. If nothing mentioned then will find everything
    .then((result) => {
        console.log(result); //result will be displayed at backend 
        res.json(result);         
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err); //if error then 500(server side error). 200-success, 400-client side error
    });   
})

//to delete. Method used is delete
router.delete('/delete/:id', (req,res) => { //use delete method in postman
    Model.findByIdAndDelete(req.params.id, {new:true}) 
    .then((result) => {
        res.json(result);         
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err); 
    });   
})

router.get('/getbyid/:id', (req,res) => { 
    Model.findById(req.params.id).populate('uploadedBy')
    .then((result) => {
        res.json(result);         
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err); 
    });   
})


//exporting userRouter 
module.exports=router;