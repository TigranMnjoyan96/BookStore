const {Router} = require('express')
const Book = require('../models/Book')
const router = Router()



router.post('/add', async (req, res) => {
    const books = await Book.findById(req.body._id)
    await req.user.addToCart(books)
    console.log(books)
    res.redirect('/cart')
})



router.get('/', (req, res) => {
    res.render('cart', {
        title: 'Cart',
        isCart: true
    })
})





module.exports = router