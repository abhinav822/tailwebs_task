const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const route = require('./routes/route.js');


const app = express()

app.use(express.json())


mongoose.connect("mongodb+srv://FunctionUp-Cohort_Group5:qXSbWL3JrmHVlc4W@project-1.xd5zdfo.mongodb.net/project-1blogging?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);

app.listen(3000, function () {
    console.log('Express app running on port ' +3000)
});