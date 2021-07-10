import { React, useState } from 'react'
import Details from './Details'

const Country = ({ countries }) => {

  const [ showCountry, setShowCountry ] = useState();

  const show = event => {
    const cont = countries.filter(country => 
      country.name.includes(event.target.value)
    )
    setShowCountry(cont[0])
  }

  if(showCountry !== undefined) {
    return (
      <Details country={showCountry} />
    )
  }
  
  return (
    <ul>
      {countries.map(country =>
      <li key={country.name}>
        {country.name} 
        <button onClick={show} value={country.name}>
          show
        </button>
      </li>	)}
    </ul>
	)
}

export default Country