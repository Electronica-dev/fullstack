import React from 'react'
import Weather from './Weather'

const Details = ({ country }) => {

	return (
		<div>
			<h1>{country.name}</h1>
			<>Capital: {country.capital}
			<br />Population: {country.population}</>
			<h2>Language(s)</h2>
			<ul>{country.languages.map(language => 
					<li key={language.name}>{language.name}</li>
				)}
			</ul>
			<p>
				<img src={country.flag} alt="flag"/>
			</p>
      <Weather country={country} />
		</div>
	)
}

export default Details