import { getLocalStorage,setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId; // ID del producto
      this.product = {}; // Objeto para almacenar los detalles del producto
      this.dataSource = dataSource; // Instancia de ProductData
    }
  
    async init() {
      // Obtener los detalles del producto usando el ID
      this.product = await this.dataSource.findProductById(this.productId);
      // Renderizar los detalles del producto en la página
      this.renderProductDetails();
  
      // Añadir un listener al botón "Add to Cart"
      document
        .getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }
  
    // renderProductDetails() {
    //   productDetailsTemplate(this.product);
    //   const container = document.getElementById("product-details"); // Asegúrate de tener este contenedor en tu HTML
    //   container.innerHTML = productDetailsTemplate(this.product);

    // }
    renderProductDetails() {
      document.getElementById('productBrand').textContent = this.product.Brand.Name;
      document.getElementById('productName').textContent = this.product.NameWithoutBrand;
      document.getElementById('productImage').src = this.product.Image;
      document.getElementById('productPrice').textContent = `$${this.product.FinalPrice}`;
      document.getElementById('productColor').textContent = this.product.Colors[0].ColorName;
      document.getElementById('productDesc').innerHTML = this.product.DescriptionHtmlSimple;
      document.getElementById('addToCart').dataset.id = this.product.id;
    }
    addToCart() {
      const cartItems = getLocalStorage("so-cart") || [];
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
    }

  }

// function productDetailsTemplate(product) {
//   return `<section class="product-detail">
//     <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">${product.DescriptionHtmlSimple}</p>
//     <div class="product-detail_add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div>
//   </section>`;
// }