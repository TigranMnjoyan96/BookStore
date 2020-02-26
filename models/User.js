const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                bookId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true
                }
            }
        ]
    }

})


module.exports = model('User', userSchema)