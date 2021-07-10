import {React, useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Countries from './components/Countries'

const App = () => {

  const [ allCountries, setAllCountries ] = useState([])
	const [ filter, setFilter ] = useState('')

	const hook = () => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setAllCountries(response.data)
		})
	}

	useEffect(hook, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value) 
	}

  const entries = allCountries.filter(({name}) => name.toLowerCase().includes(filter))

	return (
		<div>
			<form>
				find countries
				<input 
					value={filter}
					onChange={handleFilterChange}
				/>
			</form>
			<Countries countries={entries} />
		</div>
	);
}

export default App