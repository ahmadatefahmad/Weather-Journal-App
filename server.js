// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(3000, err =>{
    if(err){
        console.log(err)
    }
    else{
        console.log('listening to port 3000', 3000)
    }
})

// GET route
app.get('/data', (req, res) => {
  res.send(projectData)
})

app.post('/', (req, res) => {
  projectData.temp = req.body.temp
  projectData.date = req.body.date
  projectData.feeling = req.body.feeling
  projectData.city = req.body.city
  projectData.country = req.body.countryCode
  res.end()
})