function showItemModal(title, imageUrl, description, price) {
    // Set modal content
    document.getElementById('itemModalLabel').innerText = title;
    document.getElementById('itemModalImage').src = imageUrl;
    document.getElementById('itemModalDescription').innerText = description;

    // Create and display the price
    const modalPriceElement = document.getElementById('itemModalPrice');
    if (modalPriceElement) {
        modalPriceElement.innerText = `Price: ${price}`;
    } else {
        const newPriceElement = document.createElement('p');
        newPriceElement.id = 'itemModalPrice';
        newPriceElement.innerText = `Price: ${price}rs`;
        newPriceElement.style.fontWeight = "bold";
        newPriceElement.style.marginTop = "10px";
        const modalBody = document.querySelector('.modal-body');
        modalBody.appendChild(newPriceElement);
    }

    // Add event listener for "Add to Cart" button
    const addToCartButton = document.querySelector('.btn-warning');
    addToCartButton.addEventListener('click', () => {
        addToCart(title, imageUrl, price);
        // Close the modal after adding to cart
        const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
        itemModal.hide();
    });

    // Show the modal
    const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
    itemModal.show();
}

// Initialize cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to the cart
function addToCart(title, imageUrl, price) {
    // Check if item is already in the cart
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        // Increase quantity if item already in the cart
        existingItem.quantity++;
    } else {
        // Add new item to cart
        cart.push({
            title,
            imageUrl,
            price,
            quantity: 1
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
