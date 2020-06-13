//empty js object which act as endpoint for all routes
projectData = {};

//require express bodyParser and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//start instance of express app
const app = express();

//geonames
const usernameGeo = process.env.username;
const baseurlGeo = process.env.geoBaseUrl;

//weatherbit
const weatherbitkey = process.env.weatherBitApi;

//pixabay 
const pixabaykey = process.env.pixabayApi

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

<<<<<<< HEAD
app.get('/', (req, res) => {
    res.status(200).send(projectData);
})
  
// post route 
app.post('/', (req, res) => {
    const {date, temp, content} = req.body
    projectData[date] = {
      temp,
      content,
=======
//fetching geonames
getCityData = async city => {
    try {
        const result = await fetch(`${baseurlGeo}q=${city}&maxRows=10&username=${usernameGeo}`)
        const cities = result.json()
        console.log(cities)
        return cities
    }catch(e){
        throw e
    }
}

//get city
app.post('/cities', async(req, res)=>{
    try{
        const term = req.body
        const data = await getCityData(term)
        res.send(data)
    }catch(e){
        throw e
>>>>>>> secondbranch
    }
})

//server setup
app.listen(8081, ()=>{
    console.log(`server is running in port 8081`);
})















