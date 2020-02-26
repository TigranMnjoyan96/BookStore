const {Router} = require('express')
const Book = require('../models/Book')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add',
        isAdd: true
    })
})


router.post('/', async (req, res) => {
    const books = new Book({
        title: req.body.title,
        price: req.body.price,
        url: req.body.url
    })

    try {
        await books.save()
        res.redirect('/books')
    } catch(err) {
        console.log(err)
        
    }
})

module.exports = router