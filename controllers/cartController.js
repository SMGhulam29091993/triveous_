const {Cart, Product} = require("../models");

module.exports.addCart = async (req,res,next)=>{
    try {
        const { userId, productId, price, quantity } = req.body;
        // Checking if the product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found', success: false });
        }
        // Calculate total price
        const total = price * quantity;
        // Check if the user already has the product in their cart
        let cartItem = await Cart.findOne({ where: { userId, productId } });
        if (cartItem) {
            // If the product exists in the cart, update the quantity and total price
            cartItem.quantity += quantity;
            cartItem.total += total;
            await cartItem.save();
        } else {
            // If the product doesn't exist in the cart, create a new cart item
            await Cart.create({ userId, productId, price, quantity, total });
        }
        res.status(200).send({ message: 'Product added to cart', success: true , cartItem});
    } catch (error) {
        next(error);
    }
}

module.exports.getCart = async (req,res,next)=>{
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.findAll({ where: { userId }, include: Product });
        res.status(200).send({ message: 'Cart items retrieved successfully', success: true, cartItems });
    } catch (error) {
        next(error);
    }
}

module.exports.updateQuantity = async (req,res,next)=>{
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        // Find the cart item
        let cartItem = await Cart.findOne({ where: { userId, productId } });
        if (!cartItem) {
            return res.status(404).send({ message: 'Cart item not found', success: false });
        }
        // Update the quantity and total price
        cartItem.quantity = quantity;
        cartItem.total = cartItem.price * quantity;
        await cartItem.save();
        res.status(200).send({ message: 'Cart item quantity updated', success: true, cartItem });
    } catch (error) {
        next(error);
    }
}

module.exports.removeItems = async (req,res,next)=>{
    try {
        const { userId, productId } = req.params;
        // Find and delete the cart item
        await Cart.destroy({ where: { userId, productId } });
        res.status(200).send({ message: 'Item removed from cart', success: true });
    } catch (error) {
        next(error);
    }
}