//declaring globel variables
const date = document.getElementById('date');
const city = document.getElementById('city');
const generate = document.getElementById('generate');

//get today's date
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();

const getTrips = async () => {
  try {
    const result = await fetch('http://localhost:8081/trips')
    const trips = await result.json()
    if (trips.length > 0) {
      trips.forEach(trip => console.log(trip))
    }
  } catch (e) {
    setError("We couldn't fetch your trips. Please try again later.")
  }
}

const saveTrip = async (location, date) => {
  const result = await fetch('http://localhost:8081/trip', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({location, date}),
  })
  if (!result.ok) {
    setFormError("We weren't able to save your trip. Please try again.")
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