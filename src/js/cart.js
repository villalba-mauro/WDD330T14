import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

//Made in week 2
// Función para actualizar el total
function updateCartTotal() {
  const cartItems = document.querySelectorAll('.cart-card');
  const totalElement = document.getElementById('totalAmount');
  const cartFooter = document.querySelector('.cart-footer');
  
  let total = 0;
  
  cartItems.forEach(item => {
    const priceText = item.querySelector('.cart-card__price').textContent;
    const quantity = parseInt(item.querySelector('.cart-card__quantity').textContent.split(': ')[1]);
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    total += price * quantity;
  });

  totalElement.textContent = total.toFixed(2);
  
  // Mostrar/ocultar según contenido
  cartFooter.classList.toggle('hide', cartItems.length === 0);
}

// Ejecutar al cargar y cada vez que se modifique el carrito
document.addEventListener('DOMContentLoaded', updateCartTotal);
// También deberías llamar a updateCartTotal después de cualquier modificación del carrito