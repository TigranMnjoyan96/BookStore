const {Router} = require('express')
const Book = require('../models/Book')
const router = Router()

router.get('/', async (req, res) => {

    const books = await Book.find().lean().populate('userId', 'name email').select('title price url')

    res.render('books', {
        title: 'Books',
        isBooks: true,
        books
    })
})


router.get('/:_id/edit', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/')
    }

    const books = await Book.findById(req.params._id).lean()
    
    res.render('edit', {
        title: `Edit ${books.title}`,
        books
    })
})


router.post('/edit', async (req, res) => {
    const {_id} = req.body
    delete req.body._id
    await Book.findByIdAndUpdate(_id, req.body)

     res.redirect('/books')

})

router.post('/remove', async (req, res) => {
     await Book.deleteOne({
        _id: req.body._id
    })
    res.redirect('/books')
    
})

router.get('/:_id', async (req, res) => {
   
    const books = await Book.findById(req.params._id).lean()
    res.render('book', {
        layout: 'empty',
        title: `Book ${books.title}`,
        books
    })

})

module.exports = router