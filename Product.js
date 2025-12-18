let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItem = null;

function showItemModal(title, image, description, price) {
    selectedItem = { title, image, price };

    document.getElementById("itemModalLabel").innerText = title;
    document.getElementById("itemModalImage").src = image;
    document.getElementById("itemModalDescription").innerText = description;
    document.getElementById("itemModalPrice").innerText = `Price: ₹${price}`;

    const modal = new bootstrap.Modal(document.getElementById("itemModal"));
    modal.show();
}

document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!selectedItem) return;

    const existing = cart.find(item => item.title === selectedItem.title);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...selectedItem, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");

    bootstrap.Modal.getInstance(document.getElementById("itemModal")).hide();
});
