const express = require('express');
const { addProduct, updateProduct, getProduct, removeProduct } = require('../../controller/productController/productController');
const route = express.Router();

route.post('/add-product', addProduct);
route.patch('/update-product', updateProduct);
route.get('/get-product', getProduct);
route.patch('/remove-product',removeProduct);

module.exports = route;