import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource); // Crear instancia de ProductDetails
product.init(); 



