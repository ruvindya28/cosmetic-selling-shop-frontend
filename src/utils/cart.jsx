// utils/cart.js

export function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
    }

    cart = JSON.parse(cart);
    return cart;
}

export function addToCart(product, qty) {
    let cart = getCart();

    // Correct comparison: use a different variable name in `findIndex` callback
    const productIndex = cart.findIndex((item) => item.productId === product.productId);

    if (productIndex === -1) {
        cart.push({
            productId: product.productId,
            name: product.name,
            altNames: product.altNames,
            price: product.price,
            labeledPrice: product.labeledPrice,
            image: product.image[0],
            quantity: qty,
        });
    } else {
        cart[productIndex].quantity += qty;

        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((item) => item.productId !== product.productId);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();

    cart = cart.filter((product) => product.productId !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function getTotal(){
    let cart = getCart();
    let total=0;
    cart.forEach((product) => {
        total += product.price * product.quantity
    })
    return total;
}

export function getTotalLabeledPrice(){
    let cart = getCart();
    let total=0;
    cart.forEach((product) => {
        total += product.labeledPrice * product.quantity
    })
    return total;
}

