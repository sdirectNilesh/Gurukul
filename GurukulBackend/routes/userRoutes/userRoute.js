const express = require('express');
const {  userSignup, userSignedIn, updateUser, getUser } = require('../../controller/userController/userController');
const route = express.Router();

route.post('/user-sign-up', userSignup);
route.post('/user-sign-in', userSignedIn);
route.patch('/update', updateUser);
route.get('/user-list', getUser);


module.exports = route;