const express = require('express');  //importing express
const { createServer } = require("http");  //import http(built in libraray)
const cors=require('cors'); //importing cors


const userRouter=require('./routers/userRouter') //importing userRouter
const podcastRouter=require('./routers/podcastRouter') //importing podcastRouter
const utilRouter=require('./routers/util') //importing podcastRouter

//initializing express app
const app = express();
const httpServer = createServer(app);


//defining port
const port = 5000;

//middleware(app.use): only reads/parses/routes request but not respond
app.use(express.json()); 
app.use( cors({origin: ['http://localhost:3000']}));
app.use('/user', userRouter);
app.use('/podcast', podcastRouter);
app.use('/util', utilRouter);
app.use(express.static('./static/uploads'))

//creating a route/endpoint.   post, get are request methods
app.get( '/', (req, res)=> {
    res.send('response from express. HELLO');
})
app.get( '/home', (req, res)=> {     //accessed on localhost5000/home
    res.send('response from home. HELLO');
})

//starting the server
//listen is the function to start server
httpServer.listen( port, ()=> { console.log('express Server ready')}); //callback function

