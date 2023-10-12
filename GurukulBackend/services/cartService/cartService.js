const cart = require('../../models/cartModel/cartModel');

exports.createCart = async (cartInfo) => {
    const cartExist = await cart.findOne(
        {
            userId: cartInfo.userId,
            productId: cartInfo.productId
        });
    console.log(cartExist)
    if (cartExist) {
        cartExist.count = cartInfo.count;
        await cartExist.save();
        return cartExist;
    } else {
        const createCart = new cart(cartInfo);
        await createCart.save();
        return createCart;
    }
}

exports.cartList = async (userId) => {
    const findCartList = await cart.find({ userId });
    return findCartList;
}

exports.removedCart = async (cartInfo) => {
    const removedCart = await cart.findOneAndRemove(
        {
            userId: cartInfo.userId,
            productId: cartInfo.productId
        }
    );
    return removedCart;
}