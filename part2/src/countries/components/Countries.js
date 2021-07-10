import React from 'react'
import Details from './Details'
import Country from './Country'

const Countries = ({ countries }) => {

	if(countries.length >= 10) {
		return (
			<>
				Too many matches, specify another filter
			</>
		)
	}
  if(countries.length === 1) {
    return (
      <Details country = { countries[0] } />
    )
  }
  else {
    return (
      <Country countries={ countries }/>
    )
  }
}

export default Countries