import axios from 'axios'
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
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = (props) => (
  <>
    {props.persons.filter(person => person.name.slice(0, props.filter.length).toLowerCase() === props.filter.toLowerCase())
      .map(person => <Person person = {person} key = {person.id}/>)}
  </>
)

const Person = (props) => (
  <>
    {props.person.name} {props.person.number}<br />
  </>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const isFound = persons.reduce((searchResult, person) => {
      if (person.name === newName) {
        searchResult = true
      }
      return searchResult
    }, false)

    if (!isFound) {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
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
      <Persons persons = {persons} filter = {filter} />
    </div>
  )
}

export default App