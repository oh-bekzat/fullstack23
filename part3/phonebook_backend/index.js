const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const requestLogger = (request, response, next) => {
	next()
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else {
		console.error(error.response.data.error)
	}
	next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
// app.use(morgan('tiny'))
morgan.token('reqBody', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms - :reqBody'))

//let persons = []

// app.get('/api/persons', (request, response) => {
//     response.json(persons)
//     console.log(persons)
// })

app.get('/api/persons', (request, response) => {
	Person.find({}).then(person => {
		response.json(person)
	})
})

app.get('/info', (request, response, next) => {
	Person.countDocuments({})
		.then(count => {
			const date = new Date()
			response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
		})
		.catch(error => {next(error)})
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)
//   person ? response.json(person) : response.status(404).end()
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
//     response.status(204).end()
// })

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({ error: 'name or number missing' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body
	Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})