import personService from './services/persons'
import {useState, useEffect} from 'react'
import './index.css'

const Notification = ({message, isError}) => {
  const notificationStyle = {
    borderStyle: 'solid',
    borderColor: isError ? '#ff1717' : '#ffb224',
    padding: 10,
    fontSize: 20,
    backgroundColor: isError ? '#ff9999' : '#ffe175'
  }
  if (message === null) {
    return null
  } return (
    <>
      <div style = {notificationStyle}>
        {message}
      </div><br />
    </>
  )
}

const Filter = (props) => (
  <>
    filter shown with <input value = {props.filter} onChange = {props.handleFilterChange} />
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
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('Notification bar')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  if (!persons) {
    return null
  }

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
                setNotification(`${changedPerson.name}'s number changed to ${changedPerson.number}`)
                setTimeout(() => {
                  setNotification('Notification bar')
                }, 3000)
              })
              .catch(() => {
                setIsError(true);
                setNotification(`${person.name} was already deleted`)
                setPersons(persons.filter(p => p.id !== person.id))
                setTimeout(() => {
                  setIsError(false);
                  setNotification('Notification bar')
                }, 3000)
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
          setNotification(`${returnedPerson.name} was added`)
          setTimeout(() => {
            setNotification('Notification bar')
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const disposeOf = (props) => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personService
        .dispose(props.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== props.id))
          setNotification(`${props.name} was successfully deleted`)
          setTimeout(() => {
            setNotification('Notification bar')
          }, 3000)
        })
        .catch(error => {
          setNotification(`${props.name} could not be deleted`);
        });
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
      <Notification isError = {isError} message = {notification}/>
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