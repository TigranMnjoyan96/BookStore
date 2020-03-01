const cart = document.querySelector('#cart')

if(cart) {
    cart.addEventListener('click', event => {
        if(event.target.classList.contains('remove')) {
            const id = event.target.dataset.id
            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json()).then(data => {
                console.log(data)
                    if(data.books.length) {
                        const html = data.books.map(item => {
                            return  `
                            <tr>
                            <td>${item.title}</td>
                            <td>${item.count}</td>
                            <td>
                                <button class="btn red remove" data-id="${item._id}" >Delete</button>
                            </td>
                        </tr>
                            `
                        }).join('')
                        cart.querySelector('tbody').innerHTML = html
                        // cart.querySelector('.price').textConent = data.price

                    } else {
                        cart.innerHTML = '<p>Cart is empty</p>'
                    }
                })
        }
    })
}