const express =  require("express");
const { verifyUser } = require("../../../utils/verifyUser");
const router = express.Router();
const productController = require("../../../controllers/productController.js");

router.post("/create-product", verifyUser, productController.createProduct);



module.exports = router;