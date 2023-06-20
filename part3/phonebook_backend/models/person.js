const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function(value) {
				if (value.length < 8) {
					return false
				}
				const parts = value.split('-')
				if (parts.length !== 2) {
					return false
				}
				const part1 = parts[0]
				const part2 = parts[1]
				if (!/^\d+$/.test(part1) || !/^\d+$/.test(part2)) {
					return false
				}
				if (part1.length < 2) {
					return false
				}
				return true
			},
			message: 'Number must be in the format "XXX-XXXXXX" with a length of 8 or more.'
		},
		required: true
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)