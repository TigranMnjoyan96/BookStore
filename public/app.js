const cart = document.querySelector('#cart')

if(cart) {
    cart.addEventListener('click', event => {
        if(event.target.classList.contains('remove')) {
            const id = event.target.dataset.id
            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    
                })
        }
    })
}