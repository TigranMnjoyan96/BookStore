const express = require('express')
const exphbs = require('express-handlebars')
const homeRouter = require('./routes/home')
const booksRouter = require('./routes/books')
const addRouter = require('./routes/add')
const cartRouter = require('./routes/cart')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/User')
const app = express()


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e56d8aa6d47ce12f2aac4f4')
        req.user = user
        next()
    } catch(err) {
        console.log(err)
    }
})


app.use(express.static(path.join(__dirname, ('public'))))
app.use(express.urlencoded({extended: true}))


app.use('/', homeRouter)
app.use('/books', booksRouter)
app.use('/add', addRouter)
app.use('/cart', cartRouter)


const PORT = process.env.PORT || 5000




async function start() {
    try {
        const url = 'mongodb+srv://virap:erevan10@cluster0-vxh3h.mongodb.net/bookshop?retryWrites=true&w=majority'
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        
        const candidate = await User.findOne()

        if(!candidate) {
            const user = new User({
                name: 'Tigran',
                email: 'mnjoyan96@gmail.com',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start()