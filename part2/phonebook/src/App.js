import personService from './services/persons'
import {useState, useEffect} from 'react'

const Filter = (props) => (
  <>
    filter shown with<input value = {props.filter} onChange = {props.handleFilterChange} />
  </>
)

const PersonForm = (props) => (
  <form onSubmit = {props.addPerson}>
    <div>
      name: <input value = {props.newName} onChange = {props.handlePersonChange} /><br></br>
      number: <input value = {props.newNumber} onChange = {props.handleNumberChange} />
    </div>
    <div>
      <button type = "submit">add</button>
    </div>
  </form>
)

const Persons = (props) => (
  <>
    {props.persons
      .filter(person => person.name.slice(0, props.filter.length).toLowerCase() === props.filter.toLowerCase())
      .map(person => <Person person = {person} key = {person.id} dispose = {() => props.disposeOf(person)} />)}
  </>
)

const Person = (props) => (
  <>
    {props.person.name} {props.person.number} <button onClick = {props.dispose}>delete</button><br />
  </>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const isFound = persons.reduce((searchResult, person) => {
      if (person.name === newName) {
        searchResult = true
        if (person.number !== newNumber) {
          if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
            const changedPerson = {...person, number: newNumber}
            personService
              .update(person.id, changedPerson)
              .then(changedPerson => {
                setPersons(persons.map(p => p.id !== person.id ? p : changedPerson))
              })
          }
        } else {
          alert(`${newName} is already added to phonebook`)
        }
      }
      return searchResult
    }, false)

    if (!isFound) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const disposeOf = (props) => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personService
        .dispose(props.id)
        .then(() => setPersons(persons.filter(person => person.id !== props.id)))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson = {addPerson} newName = {newName} handlePersonChange = {handlePersonChange}
        newNumber = {newNumber} handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {filter} disposeOf = {disposeOf} />
    </div>
  )
}

export default App