const {Router} = require('express')
const Book = require('../models/Book')
const router = Router()




function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.bookId._doc, count: c.count
    }))
}


function computePrice(price) {
    return price.reduce((p, t) => {
        return p += t.price * t.count
    }, 0)
}




router.post('/add', async (req, res) => {
    const books = await Book.findById(req.body._id)
    await req.user.addToCart(books)
    res.redirect('/cart')
})


router.post('/remove/:_id', async (req, res) => {
    // const cart = await Book.findById(req.params._id)
    await req.user.removeCart(req.params._id)
    res.status(200).json(cart)
})


router.get('/', async (req, res) => {

    const user = await req.user.populate('cart.items.bookId').execPopulate()

    const books = mapCartItems(user.cart)
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        books: books,
        price: computePrice(books)
    })
})





module.exports = router