import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';
import { getParam } from "./utils.mjs";

const productId = getParam('product'); // Obtener el ID del producto desde la URL
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource); // Crear instancia de ProductDetails
product.init(); // Inicializar la página de detalles
// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }
function addProductToCart(product) {
  // 1. Obtener el carrito existente (SI no es un array, lo inicializa)
  let currentCart = getLocalStorage("so-cart");
  
  // 2. Si currentCart no es un array, lo convierte en uno
  if (!Array.isArray(currentCart)) {
    currentCart = [];
  }
  
  // 3. Agrega el producto al array
  currentCart.push(product);
  
  // 4. Guarda en localStorage
  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  console.log("Carrito actualizado:", getLocalStorage("so-cart")); // Debug
}


// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

// Asegurar que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCartHandler);
  }
});
// Obtener el ID del producto desde la URL

// Asegúrate de que estás usando el valor de `productId`
console.log("ID del producto:", productId);


