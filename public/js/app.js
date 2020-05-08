


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('.location')
const messageForecast = document.querySelector('.forecast')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    if( location.length > 0 ){
        fetch('/weather?address='+location).then( (response)=>{
            response.json().then( (jsonResponse)=>{
                if(!jsonResponse.error){
                    const {data} = jsonResponse
                    messageLocation.textContent = data.location
                    messageForecast.textContent = data.forecast
                    console.log(data)
                }else{
                    messageLocation.textContent = 'Not found.'
                    messageForecast.textContent = 'Invalid search location.'
                    console.log(jsonResponse.error)
                }
            })
        })
    }else{
        console.log('Location field is required.')
    }




    
})