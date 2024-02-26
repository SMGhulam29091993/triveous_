const {Order, Cart, Product} = require('../models');


module.exports.placeOrder = async (req, res, next) => {
  try {
    const { userId, cartItems } = req.body;
    
    let orders = [];
    
    // If cartItems is an array, place orders for all items
    if (Array.isArray(cartItems)) {
      for (const item of cartItems) {
        const order = await createOrder(userId, item);
        orders.push(order);
      }
    } else {
      // If cartItems is not an array, place order for the single item
      const order = await createOrder(userId, cartItems);
      orders.push(order);
    }
    
    res.status(201).json({ message: 'Order(s) placed successfully', orders });
  } catch (error) {
    next(error);
  }
};

// Helper function to create an order for a single item
const createOrder = async (userId, item) => {
  const { productId, quantity } = item;


  const product = await Product.findByPk(productId);

  const totalPrice = product.price * quantity;

  const order = await Order.create({ userId, totalPrice });

  await order.addProduct(product, { through: { quantity } });
  await Cart.destroy({where:{userId, productId}})

  return order;
};




module.exports.getOrderHistory = async (req, res, next) => {
  if(req.user.id !== parseInt(req.params.id)){
    return res.status(404).send({message:"You Are Not Authorized", success: false})
  }
  try {
    const userId = req.params.id;
    const orders = await Order.findAll({ where: { userId }, include: Product });
    res.status(200).send({message : "Here is your order history", success:true, orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrderDetails = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId, { include: Product });
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send({message:"Your Order Details", success:true, order });
  } catch (error) {
    next(error);
  }
};
