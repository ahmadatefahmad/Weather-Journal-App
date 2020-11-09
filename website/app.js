/* Global Variables */

const apiKey = "76d85b96fe997eead985200d4d0e3ec6";
let data = {}

// Create a new date instance dynamically with JS
let d = new Date()
data.date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// IIFE fetching country's code
(async () => {
    try{
        await fetch('https://freegeoip.app/json/')
        .then(res => res.json())
        .then(res => {data.countryCode = res.country_code})
    }
    catch(err){
        console.error("error", err);
    } 
})()

const getData = async (url= '') =>{
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        })
}

const updateData = async () => {
    data.feeling = document.getElementById('feelings').value
    let zip = document.getElementById('zip').value
    resetEntries()
    try{
        // Fetching temp
        await fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zip},${data.countryCode}&APPID=${apiKey}`)
        .then(res => res.json())
        .then(fetch => {
            data.temp = fetch.main.temp
            data.city = fetch.name
        })

        // post data obj to the server
        postData('/', data)

        // getting data obj from server
        const projectData = await getData('/data')

        // populate data in UI
        document.getElementById('date').innerHTML = `Date: ${projectData.date}`
        document.getElementById('temp').innerHTML = `Temperature: ${projectData.temp}<sup>&deg;</sup> C`
        document.getElementById('location').innerHTML = `Location: ${projectData.city}, ${(projectData.country)}`
        if(projectData.feeling != '')document.getElementById('content').innerHTML = `Feelings: ${projectData.feeling}`
        
    }
    catch(err){
        console.error("error", err)
        document.getElementById('err-msg').innerHTML = 'Please Enter a Valid ZIP Code'
    }
}

const resetEntries = () => {
    document.getElementById('err-msg').innerHTML = ''
    document.getElementById('zip').value = ''
    document.getElementById('feelings').value = ''
    document.getElementById('date').innerHTML = ''
    document.getElementById('temp').innerHTML = ''
    document.getElementById('location').innerHTML = ''
    document.getElementById('content').innerHTML = ''
}


document.getElementById('generate').addEventListener('click', updateData);

