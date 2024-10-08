// Datos mockeados de los productos
const mockProducts = [
    { id: 1, name: 'Nike Gianis Inmortaliy', price: 10, description: 'Descripción del producto' },
    { id: 2, name: 'Asics Gel rocket 11', price: 20, description: 'Descripción del producto' }
];

// Función para obtener parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para agregar un producto al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Asegurarse de que cada producto tenga un ID único usando Date.now() como ID
    const uniqueProduct = { ...product, id: Date.now() }; // Asigna un ID único
    cart.push(uniqueProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId); // Solo elimina el producto con el ID especificado
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Actualiza la lista después de eliminar
}

// Función para mostrar los productos en el carrito
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsUl = document.getElementById('cart-items');
    cartItemsUl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsUl.innerHTML = '<li>El carrito está vacío</li>';
    } else {
        cart.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.textContent = `${item.name} - $${item.price}`;
            
            // Crear el ícono de eliminar
            const removeIcon = document.createElement('i');
            removeIcon.className = 'fas fa-trash remove-item'; // FontAwesome icon
            removeIcon.dataset.productId = item.id; // Asocia el ID único del producto con el ícono
            
            // Añadir manejador de clic al ícono de eliminar
            removeIcon.onclick = function() {
                const productId = parseInt(this.dataset.productId, 10);
                removeFromCart(productId); // Elimina solo el producto con el ID especificado
            };
            
            itemLi.appendChild(removeIcon);
            cartItemsUl.appendChild(itemLi);
        });
    }
}

// Función para manejar el clic en el botón de hacer compra
function handleCheckout() {
    alert('¡Compra realizada con éxito!');
}

// Evento de clic para el botón de hacer compra
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }

    // Mostrar/ocultar la lista de productos en el carrito
    const toggleCartButton = document.getElementById('toggle-cart');
    if (toggleCartButton) {
        toggleCartButton.addEventListener('click', function() {
            const cartList = document.getElementById('cart-list');
            if (cartList.style.display === 'none') {
                cartList.style.display = 'block';
                displayCart();
                toggleCartButton.textContent = 'Ocultar productos';
            } else {
                cartList.style.display = 'none';
                toggleCartButton.textContent = 'Mostrar productos';
            }
        });
    }

    // Evento para agregar producto al carrito en la página de detalles
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        const productId = getQueryParam('id');
        const product = mockProducts.find(p => p.id == productId);

        if (product) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `Precio: $${product.price}`;
            document.getElementById('product-description').textContent = product.description;

            addToCartButton.addEventListener('click', function() {
                addToCart(product);
                alert('Producto agregado al carrito');
            });
        }
    }

    // Mostrar productos en el carrito si estamos en la página del carrito
    if (window.location.pathname.includes('carrito.html')) {
        displayCart();
    }
});
