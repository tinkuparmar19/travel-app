//declaring globel variables
const date = document.getElementById('date');
const city = document.getElementById('city');
const generate = document.getElementById('generate');

//get date difference
const difference = (
  (new Date(date.value).getTime() - new Date().getTime()) /
  (1000 * 60 * 60 * 24)
).toFixed(0)

const getTrips = async () => {
  try {
    const result = await fetch('http://localhost:3000/trips')
    const trips = await result.json()
    if (trips.length > 0) {
      trips.forEach(trip => {
        const {location, weather, picture} = trip
        document.getElementById('location').innerHTML = location
        document.getElementById('tmax').innerHTML = weather.max_temp
        document.getElementById('tmin').innerHTML = weather.min_temp
        document.getElementById('summary').innerHTML = weather.summary
        document.getElementById('date').innerHTML = difference
        document.getElementById('picture').innerHTML = picture
      })
    }
  } catch (e) {
    setError("We couldn't fetch your trips. Please try again later.")
  }
}

const saveTrip = async (location, date) => {
  const result = await fetch('http://localhost:3000/trip/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({location}),
  })
  if (!result.ok) {
    console.log("We weren't able to save your trip. Please try again.")
  } else {
    getTrips()
  }
}

function handleSubmit() { generate.addEventListener('click', ()=>{
  saveTrip(city.value, date.value);
})
}

handleSubmit();
export {handleSubmit}