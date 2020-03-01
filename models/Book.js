const {Schema, model} = require('mongoose')


const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = model('Book', bookSchema)