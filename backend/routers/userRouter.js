const express = require('express'); //req:shortcut to import package
const router=express.Router(); //router is imported from express so express also has to be imported in this file
const Model=require('../models/userModel')


//create or add
router.post('/add',(req,res) => { //can be accessed only after user as the route has been specified in index.js- localhost:5000/user/add
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
    Model.find({})  //will find the data mentioned and return an array of the same. If nothing mentioned then will find everything
    .then((result) => {
        console.log(result); //result will be displayed at backend 
        res.json(result);         
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err); //if error then 500(server side error). 200-success, 400-client side error
    });   
})
router.get('/getbyemail/:email', (req,res)=>{ //:email-url parameter. ':'-denotes parameter
    Model.findOne({email : req.params.email}) //find returns empty array if element not found. findOne returns null if not found
    .then((result) => {
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

//update. Method used is put
router.put('/update/:id', (req,res) => {  
    Model.findByIdAndUpdate(req.params.id , req.body, {new:true}) //{new:true}- will show the updated result on /update
    .then((result) => {
        res.json(result);         
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err); 
    }); 
})

router.post('/authenticate', (req, res) => {   //post as get appends info in url
    const formdata = req.body;
    Model.findOne({email : formdata.email, password:formdata.password})
    .then((result) => {
        console.log(result);

        //if condition will be true if user is found. 1st case-user exists and request is accepter
        if(result){
            console.log('login success')
            res.json(result);
        }
        else{ //2nd case-user does not exist and request is accepter
            console.log('login failed');
            res.status(400).json({status : 'Login Failed'});
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
}) 

//exporting userRouter 
module.exports=router; 