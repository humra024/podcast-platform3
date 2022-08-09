const mongoose = require('mongoose');

const db_name='podcast_db';
const db_url=`mongodb+srv://humra:bluesky@cluster0.qano9vc.mongodb.net/${db_name}?retryWrites=true&w=majority`

//asynchronous function - will return promise
mongoose.connect(db_url)
.then((result) => {       //thenc:shortcut for then and catch
    console.log('database connected')
}).catch((err) => {
    console.error(err);
});

module.exports=mongoose;