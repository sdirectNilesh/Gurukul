const { ErrorResponse, unauthorizedResponse, successResponse } = require('../../helper/apiResponse');
const { findAllProduct, findProduct, createNewProduct, editProduct, removedProduct } = require('../../services/productService/productService');

exports.addProduct = async(req, res) => {
    try {
        const {userId} = req.query;
        const { product_name, stock, category, price} = req.body;
        const productInfo = { product_name, stock, category, price, userId};
        if(!userId){
            return unauthorizedResponse(res, 404, "Invalid request");
        }
        const productExist = await findProduct(productInfo);
        if (productExist) {
            return successResponse( res, 200, "product already exist" );
        } else {
            const $product = await createNewProduct(productInfo);
            if($product){
                return successResponse( res, 201, "product created", $product );
            }  return unauthorizedResponse(res, 403, "Invalid details");
        }
    } catch (error) {
        console.log("Error at addProduct: ", error);
        return ErrorResponse(res, error.message)
    }
}

exports.updateProduct = async(req, res) => {
    try {
        const {productId} = req.query;
        const { product_name, stock, category, price, brand } = req.body;
        const productInfo = { product_name, stock, category, price, brand, productId };
        const $updatedProduct = await editProduct(productInfo);
        if($updatedProduct){
            return successResponse( res, 201, "product updated successfully", $updatedProduct);
        } throw new Error("Invalid request")
    } catch (error) {
        console.log("Error at updateProduct: ", error);
        return ErrorResponse(res, error.message)
    }
}

exports.getProduct = async(req, res) => {
    try {
        const {userId} = req.query;
        const productList = await findAllProduct(userId);
        if(productList) {
            return successResponse( res, 201, "product list", productList);
        } throw new Error("Invalid request")
    } catch (error) {
        console.log("Error at getProduct: ", error);
        return ErrorResponse(res, error.message)
    }
}

exports.removeProduct = async(req, res) => {
    try {
        const {productId} = req.query;
        const removeProduct = await removedProduct(productId);
        if(removeProduct){
            return successResponse( res, 201, "product has been removed", removeProduct);
        } throw new Error("Error at removeProduct: ", error);
    } catch (error) {
        console.log("Error at removeProduct: ", error);
        return ErrorResponse(res, error.message);
    }
}