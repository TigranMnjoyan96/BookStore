const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('cart', {
        title: 'Cart',
        isCart: true
    })
})



module.exports = router