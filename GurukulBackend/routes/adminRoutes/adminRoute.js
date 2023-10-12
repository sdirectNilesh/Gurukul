const express = require('express');
const { createAdmin, adminSignIn } = require('../../controller/adminController.js/adminController');
const route = express.Router();

route.post('/admin-sign-up', createAdmin);
route.post('/admin-sign-in', adminSignIn);

module.exports = route;