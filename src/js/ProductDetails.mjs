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
  
    renderProductDetails() {
      // Seleccionar el contenedor donde se mostrarán los detalles
      const productContainer = document.getElementById('product-details');
  
      // Generar el HTML con los detalles del producto
      productContainer.innerHTML = `
        <h2>${this.product.Name}</h2>
        <img src="${this.product.Image}" alt="${this.product.Name}">
        <p>${this.product.Description}</p>
        <p>Precio: $${this.product.FinalPrice}</p>
      `;
    }
  
    addToCart() {
        // Lógica para añadir el producto al carrito
        console.log(`Producto ${this.product.Id} añadido al carrito.`);
      }
  }