const express = require('express');
const { addToCart, getCart, removeItem } = require('../../controller/cartController/cartController');
const route = express.Router();

route.post('/add-cart', addToCart);
route.get('/get-cart', getCart);
route.delete('/remove-cart', removeItem);

module.exports = route;