const { ErrorResponse, successResponse, unauthorizedResponse } = require('../../helper/apiResponse');
const cart = require('../../models/cartModel/cartModel');
const { createCart, cartList, removedCart } = require('../../services/cartService/cartService');

exports.addToCart = async(req, res) => {
    try {
        const {userId} = req.query;
        const {productId, count} = req.body;
        const cartInfo = {productId, count, userId}
        const cartExist = await createCart(cartInfo);
        if(cartExist){
            return successResponse( res, 201, "cart has been updated", cartExist);
        } return unauthorizedResponse(res, 404, "something went wrong");
    } catch (error) {
        console.log("Error at addToCart: ", error);
        return ErrorResponse(res, error.message);
    }
};

exports.getCart = async(req, res) => {
    try {
        const {userId} = req.query;
        const getCart = await cartList(userId);
        if(getCart){
            return successResponse( res, 201, "your cart is here", getCart);
        } return unauthorizedResponse(res, 404, "cart is empty");
    } catch (error) {
        console.log("Error at getCart: ", error);
        return ErrorResponse(res, error.message);
    }
}

exports.removeItem = async(req, res) => {
    try {
        const {userId} = req.query;
        const {productId} = req.body;
        const cartInfo = {productId, userId};
        const removeItem = await removedCart(cartInfo);
        if(removeItem){
              return successResponse( res, 200, "cart is empty now");
        } return unauthorizedResponse(res, 404, "Invalid request");
    } catch (error) {
        console.log("Error at removeItem: ", error);
        return ErrorResponse(res, error.message);
    }
}
