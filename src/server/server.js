//empty js object which act as endpoint for all routes
tripData = []

//require express bodyParser and cors
const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8000;

//start instance of express app
const app = express();

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
const usernameGeo = process.env.geoUserName;
const baseurlGeo = process.env.geoBaseUrl;

const fetchCityData = async (city) => {
    try {
      if (!city) {
        throw 'Please provide a city!'
      }
      const result = await fetch(
        `${baseurlGeo}q=${city}&maxRows=10&username=${usernameGeo}`,
      )
      //console.log(result)
      const {geonames: cities} = await result.json()
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


//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY  
//weatherbit api
const weatherbitkey = process.env.weatherBitApi;
const weatherBaseUrl = process.env.weatherUrl;

const fetchCityForcast = async(lat, lng, date) => {
  try {
    const result = await fetch(`${weatherBaseUrl}?lat=${lat}&lon=${lng}&key=${weatherbitkey}`)
    const resultdata = await result.json()
    //console.log(resultdata)
    //console.log(date)
    //const newdata = resultdata.data[resultdata.data.length - 1]
    const newdata = resultdata.data.filter(item => {
      return item.valid_date == date
      //return item.valid_date
    })
    //console.log('newdata is ',newdata)
    const weatherdata = {
      max_temp: newdata[0].max_temp,
      min_temp: newdata[0].min_temp,
      summary: newdata[0].weather.description
    }
    //console.log(weatherdata)
    return weatherdata
  } catch(e) {
    throw e
  }
}

//https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
//pixabay 
const pixabaykey = process.env.pixabayApi
const pixabayBaseUrl = process.env.pixaBase
const fetchCityImage = async(city) => {
  try{
    const result = await fetch(`${pixabayBaseUrl}?key=${pixabaykey}&q=${city}&category=places`)
    const data = await result.json()
    // console.log(hits)
    // console.log(hits[0].webformatURL)
    return data.hits[0].webformatURL
    
  } catch(e) {
    throw e
  }
}

//get city
app.post('/trip', async (req, res) => {
    try {
        const city = req.body.location
        const date = req.body.tripDate
        //console.log(date)
        const {lat, lng, location} = await fetchCityData(city)
        //console.log(lat + " " + lng + " " + location)
        const weather = await fetchCityForcast(lat, lng, date)
        //console.log(weather)
        const picture = await fetchCityImage(location)
        //console.log(picture)
        const trip = {
          location,
          weather,
          picture,
        }
        //console.log(trip)
        tripData.push(trip)
        res.status(201).send()
      } catch (e) {
        console.log(e)
        res.sendStatus(404)
      }
  })

//server setup
app.listen(PORT, ()=>{
    console.log(`server is running in port ${PORT}`);
})















