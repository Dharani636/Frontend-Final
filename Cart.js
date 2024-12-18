// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');

// Function to update cart in localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Re-render the cart after updating
}

// Function to render cart items
function renderCart() {
    cartItemsContainer.innerHTML = '';  // Clear current cart items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        // Cart item content with Increase/Decrease buttons and Cancel button
        cartItemElement.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.imageUrl}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;">
                <span class="ms-3">${item.title}</span>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-secondary btn-sm me-2" onclick="decreaseQuantity(${index})">-</button>
                <span class="me-2">Quantity: ${item.quantity}</span>
                <button class="btn btn-secondary btn-sm" onclick="increaseQuantity(${index})">+</button>
                <span class="ms-2">Price: ${item.price * item.quantity}rs</span>
                <button class="btn btn-danger btn-sm ms-3" onclick="cancelItem(${index})">Cancel</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.innerText = `Total Price: ${totalPrice}rs`;
}

// Function to increase quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

// Function to decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCart();
    }
}

// Function to cancel (remove) item from cart
function cancelItem(index) {
    cart.splice(index, 1);  // Remove item at the given index
    updateCart();
}

// Call renderCart to display cart items
renderCart();
