import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
	const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
	const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

	useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
		  })
	}, [])

	const addName = (event) => {
		event.preventDefault()
		if(persons.map(person => person.name).includes(newName)) {
			if(window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) { 
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .then(() => {
            setMessage(
              `Details updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(() => {
            setMessage(
              `Information for ${person.name} has already been deleted from the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          window.location.reload()
      }
      setNewName('')
      setNewNumber('')
		}
		else {
			const nameObject = {
				name: newName,
				number: newNumber,
			}

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
			    setNewName('')
			    setNewNumber('')
        })
        .then(() => {
          setMessage(
            `${nameObject.name} added to the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
		}
	}

  const deletePerson = (event) => {

    const personName = persons.find(p => p.id === parseInt(event.target.value)).name
    
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .del(event.target.value)
        .then(
          alert (
            `${personName} has been deleted from the server`
          )
        )
        .then(window.location.reload())
    }
  }

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const filterNames = () => {
		return (
			persons.filter(({name}) => name.toLowerCase().includes(filter))
		)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

  return (
	<div>
	  <h2>Phonebook</h2>
      <Notification message={message} />
			<Filter value={filter} onChange={handleFilterChange} />
		<h2>Add new person</h2>
	    <PersonForm onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />
	  <h2>Numbers</h2>
			<ul>
				<Persons persons={filterNames()} deletePerson={deletePerson} />
			</ul>
	</div>
  )
}

export default App