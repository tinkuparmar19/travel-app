//declaring globel variables
const api_key = '1eb5e64ac23497f815bbefa194efe0df';
const url = 'https://api.openweathermap.org/data/2.5/weather';
const zip = document.getElementById('zip');
const countryCode = document.getElementById('countryCode');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

//get today's date
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();

//fetching data 
const weatherData = async (url, zip, countryCode, api_key)=>{
    try {
        const request = await fetch(`${url}?zip=${zip},${countryCode}&units=metric&appid=${api_key}`)
        const result = await request.json();
        const {
            main: {temp},
        } = result
        return temp;
    } catch(error){
        throw error;
    }
}

// post request to store date, temp and user input
const saveData = async (path, data) => {
    try {
      await fetch(path, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (e) {
      throw e
    }
}

//update ui
const updateUi = async (newTemp, newDate, newFeelings) =>{
    date.innerHTML = newDate
    temp.innerHTML = `${newTemp} deg`
    content.innerHTML = newFeelings
}

//event listener
 function handleSubmit() { generate.addEventListener('click', ()=>{
    weatherData(url, zip.value, countryCode.value, api_key)
    .then(temp => {
        return {date: newDate, temp, content: feelings.value}
    })
    .then(data => {
        saveData('/', data)
        return data;
    })
    .then(({temp, date, content}) => updateUi(temp, date, content))
      .catch(e => {
        console.error(e)
    })  
})
}

handleSubmit();
export {handleSubmit}