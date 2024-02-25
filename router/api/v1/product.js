const express =  require("express");
const { verifyUser } = require("../../../utils/verifyUser");
const router = express.Router();
const productController = require("../../../controllers/productController.js");

router.post("/create-product", verifyUser, productController.createProduct);
router.get("/get-product-details/:id", productController.getProductDetails);



module.exports = router;