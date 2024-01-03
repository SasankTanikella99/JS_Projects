const axios = require('axios');

const URL = 'http://api.weatherapi.com/v1/forecast.json'

const FORECAST_DAYS = 7

async function fetchForecast(location){
    const response = await axios({
        url: URL ,
        method: 'get',
        params: {
            q: location,
            days: 7,
            key: process.env.WEATHER_API_KEY,
        },
        responseType: 'json'
    })
    .then((response) => {
        const city = response.data.location.name;
        const country = response.data.location.country;
        const locationName = `${city}, ${country}`;

        const weatherData = response.data.forecast.forecastday.map((forecastDay) => {
            return {
                date: forecastDay.date,
                //description: forecastday.day.condition.text,
                temperatureMinC: forecastDay.day.mintemp_c,
                temperatureMaxC: forecastDay.day.maxtemp_c,
                temperatureMinF: forecastDay.day.mintemp_f,
                temperatureMaxF: forecastDay.day.maxtemp_f,

                sunriseTime: forecastDay.astro.sunrise,
                sunsetTime: forecastDay.astro.sunset,
                moonriseTime: forecastDay.astro.moonrise,
                moonsetTime: forecastDay.astro.moonset,
            }    

        }) 
        return{
            locationName,
            weatherData,
        } 

    })
    .catch((error) => {
        console.log( error);
        throw new Error(`Error in fetching the weather data for ${location}.`)

    })
        
    
}

module.exports = {
    fetchForecast,
}
