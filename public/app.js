const cart = document.querySelector('#cart')

if(cart) {
    cart.addEventListener('click', event => {
        if(event.target.classList.contains('remove')) {
            const id = event.target.dataset.id
            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(data => {
                    if(data.books.length) {
                        data.books.map(item => {
                            console.log(item)
                        })
                    } else {
                        cart.innerHTML = '<p>Cart is empty</p>'
                    }
                })
        }
    })
}