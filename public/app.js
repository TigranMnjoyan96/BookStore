const cart = document.querySelector('#cart')

if(cart) {
    cart.addEventListener('click', event => {
        if(event.target.classList.contains('remove')) {
            console.log('slsls')
        }
    })
}