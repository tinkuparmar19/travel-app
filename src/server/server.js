//empty js object which act as endpoint for all routes
projectData = {};

//require express bodyParser and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//start instance of express app
const app = express();

//bodyParser as a middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cors for cross origin allowance
app.use(cors());

//initialize the main project folder
app.use(express.static('dist'));

// get route
app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
})

app.get('/', (req, res) => {
    res.status(200).send(projectData);
})
  
// post route 
app.post('/', (req, res) => {
    const {date, temp, content} = req.body
    projectData[date] = {
      temp,
      content,
    }
    res.status(201).send()
})

//server setup
app.listen(8081, ()=>{
    console.log(`server is running in port 8081`);
})