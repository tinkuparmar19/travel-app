//empty js object which act as endpoint for all routes
tripData = []

//require express bodyParser and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//start instance of express app
const app = express();

//geonames
// const usernameGeo = process.env.username;
// const baseurlGeo = process.env.geoBaseUrl;

// //weatherbit
// const weatherbitkey = process.env.weatherBitApi;

// //pixabay 
// const pixabaykey = process.env.pixabayApi

//bodyParser as a middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors for cross origin allowance
app.use(cors());

//initialize the main project folder
app.use(express.static('dist'));

// get route
app.get('/', (req, res) => {
    //res.status(200).send(projectData);
    res.sendFile('dist/index.html');
})

app.get('/trips', (req, res) => {
    res.status(200).send(tripData)
})
//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo
//fetching data through geonames api
const fetchCityData = async (city) => {
    try {
      if (!city) {
        throw 'Please provide a city!'
      }
      const result = await fetch(
        `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=tinkuparmar`,
      )
      
      const {geonames: cities} = await result.json()
      console.log(cities)
      if (cities.length > 0) {
        const location = {
          location: `${cities[0].name}`,
          lat: cities[0].lat,
          lng: cities[0].lng,
        }
        return location
      }
      return {}
    } catch (e) {
      throw e
    }
  }


//get city
app.post('/trip', async (req, res) => {
    try {
        const city = req.body.location
        const newdate = req.body.date
      const [lat, lng, location] = await fetchCityData(city)
      const trip = {
        lat,
        lng,
        location,
        newdate,
      }
      tripData.push(trip)
      res.status(201).send()
    } catch (e) {
      console.log(e)
      res.sendStatus(404)
    }
  })

//server setup
app.listen(8081, ()=>{
    console.log(`server is running in port 8081`);
})















