const express =  require("express");
const { verifyUser } = require("../../../utils/verifyUser");
const router = express.Router();
const cartController = require("../../../controllers/cartController.js");

router.post("/add", verifyUser, cartController.addCart);
router.get("/view-cart/:userId", verifyUser, cartController.getCart);
router.put("/update-quantity/:userId/:productId", verifyUser, cartController.updateQuantity);
router.delete("/remove-items/:userId/:productId", verifyUser, cartController.removeItems)

module.exports = router;
