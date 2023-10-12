const product = require('../../models/productModel/productModel');

exports.findProduct = async (productInfo) => {
    const productExist = await product.findOne({
        product_name: productInfo.product_name
    });
    return productExist;
}

exports.createNewProduct = async (productInfo) => {
    const newProduct = new product(productInfo);
    await newProduct.save();
    return newProduct;
}

exports.editProduct = async (productInfo) => {
    const productUpdated = await product.findByIdAndUpdate(
        { _id: productInfo.productId },
        {
            product_name: productInfo.product_name,
            stock: productInfo.stock,
            category: productInfo.category,
            price: productInfo.price,
            brand: productInfo.brand
        });
    return productUpdated;
}

exports.findAllProduct = async (userId) => {
    const products = await product.find(
        { userId: userId },
        { isDeleted: false }
    );
    return products;
}

exports.removedProduct = async (productId) => {
    const removedProduct = await product.findByIdAndUpdate(
        {
            _id: productId
        },
        { isDeleted: true }
    );
    return removedProduct;
}