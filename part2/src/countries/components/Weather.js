import { React, useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ( {country} ) => {

  const [ weather, setWeather ] = useState()

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
    }, [])
  
  function degToCompass(num) {  
    const val= Math.round( (num -11.25 ) / 22.5 ) ;
    const arr=["N","NNE","NE","ENE","E","ESE", "SE", 
          "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
    return arr[ Math.abs(val) ] ;
  }

  if(weather === undefined)
  {
    console.log('inside if')
    return (
      <p>Loading...</p>
    )
  }
  else {
    console.log(weather);
    return (
      <div>
        <h2> Weather in {country.capital} </h2>
        <b> Temperature: </b> {weather.main.temp} celsius
        <br/><b> Wind: </b> {weather.wind.speed} m/s direction {degToCompass(weather.wind.deg)}
      </div>
    )
  }
}

export default Weather