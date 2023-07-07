//Navbar
let menu = document.querySelector("#menuBar");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}
window.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
}

// Carrito de compras
let cartItems = [];

function addToCart(event) {
    const button = event.target;
    const productName = button.dataset.name;
    const productPrice = parseFloat(button.dataset.price);

    const product = {
        name: productName,
        price: productPrice
    };

    cartItems.push(product);

    storeCartItems();

    updateCartView();
}

function clearCart() {
    cartItems = [];

    storeCartItems();

    updateCartView();
}

function updateCartView() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    cartItemsContainer.innerHTML = '';

    let cartTotal = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];

        const listItem = document.createElement('li');
        listItem.innerText = item.name + ' - $' + item.price.toFixed(2);

        cartItemsContainer.appendChild(listItem);

        cartTotal += item.price;
    }

    cartTotalElement.innerText = '$' + cartTotal.toFixed(2);
}

function storeCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
}

updateCartView();
