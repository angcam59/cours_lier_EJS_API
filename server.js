// 20221205114140
// https://api.openweathermap.org/data/2.5/weather?q=Cambrai&appid=32ca9a96490268d1eb4619e7b4035c63&units=metric

// {
//   "coord": {
//     "lon": 3.4167,
//     "lat": 50.1667
//   },
//   "weather": [
//     {
//       "id": 804,
//       "main": "Clouds",
//       "description": "overcast clouds",
//       "icon": "04d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 0.33,
//     "feels_like": 0.33,
//     "temp_min": 0.32,
//     "temp_max": 1.61,
//     "pressure": 1016,
//     "humidity": 95
//   },
//   "visibility": 5619,
//   "wind": {
//     "speed": 0.89,
//     "deg": 158,
//     "gust": 1.34
//   },
//   "clouds": {
//     "all": 100
//   },
//   "dt": 1670236609,
//   "sys": {
//     "type": 2,
//     "id": 2031072,
//     "country": "FR",
//     "sunrise": 1670225330,
//     "sunset": 1670255117
//   },
//   "timezone": 3600,
//   "id": 3029029,
//   "name": "Arrondissement de Cambrai",
//   "cod": 200
// }

const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    /*const tab = ["citron", "pasteque", "pomme", "banane"]
    const fruit = tab[Math.floor(Math.random() * 4)]

    //Nous allons envoyer vers le template le fruit 
    res.render('home', { object: fruit })*/
    res.render('index', {})
})
app.post('/', (req, res) => {
    const ville = req.body.ville
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=32ca9a96490268d1eb4619e7b4035c63&units=metric"
    https.get(url, (response) => {

        response.on("data", (data) => {
            const tableau_weather = []
            const meteo_data = JSON.parse(data)
            /* const temperature = meteo_data.main.temp
            const description = meteo_data.weather[0].description */
            const meteo = {
                city: ville,
                temperature: meteo_data.main.temp,
                description: meteo_data.weather[0].description,
                icon: meteo_data.weather[0].icon
            }
            tableau_weather.push(meteo)
            res.render('weather', { tableau: tableau_weather })
        
        })
    })

})

app.listen(8080, () => {
    console.log('le serveur est lancé')
}) 

