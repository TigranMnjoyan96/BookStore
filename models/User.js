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


userSchema.methods.addToCart = function(book) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.bookId.toString() === book._id.toString()
    })

    if(idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            bookId: book._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()

}


userSchema.methods.removeCart = function(id) {
    let items = [...this.cart.items]
    console.log(items)
    
    const idx = items.findIndex(c => c.bookId.toString() === id.toString())

    console.log(items[idx].count)
    if(items[idx].count === 1) {
        items = items.filter(c => c.bookId.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = {items}
    return this.save()
}

module.exports = model('User', userSchema)