const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');
const { verifyUser } = require("../../../utils/verifyUser");

router.post('/place-order', verifyUser, orderController.placeOrder);
router.get('/order-history/:id', verifyUser, orderController.getOrderHistory);
router.get('/order-details/:orderId', verifyUser, orderController.getOrderDetails);

module.exports = router;
