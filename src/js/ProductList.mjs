import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            // Pass the category to getData
            const list = await this.dataSource.getData(this.category);
            this.renderList(list);
            document.querySelector(".title").textContent = this.category;
        } catch (error) {
            console.error(`Error fetching ${this.category} products:`, error);
        }
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">${product.FinalPrice}</p>
        </a>
      </li>
    `;
}