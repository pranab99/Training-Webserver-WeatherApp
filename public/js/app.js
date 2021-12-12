console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage =  document.querySelector('#location-message')
const forecastMessage =  document.querySelector('#forecast-message')

// locationMessage.textContent ='js'
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    locationMessage.textContent = "Loading..."
    forecastMessage.textContent = ""

    fetch('http://localhost:3000/weather?address='+location).then((response)=> {
    response.json().then((data) => {
     if(data.error){
         locationMessage.textContent = data.error
        
     } 
     else{
        locationMessage.textContent = data.location
        forecastMessage.textContent = data.forecast

     }
    })

})
    
})