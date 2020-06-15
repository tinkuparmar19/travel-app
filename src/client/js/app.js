//declaring globel variables
const date = document.getElementById('date');
const city = document.getElementById('city');
const generate = document.getElementById('generate');

//get today's date
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();

function handleSubmit() { generate.addEventListener('click', ()=>{
  const result = fetch(`http://localhost:8081/cities/`,{
    method:'POST',
    credentials: "same-origin",
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({term: city.value})
  })
   .then(res => console.log(res))
})
}

//handleSubmit();
export {handleSubmit}