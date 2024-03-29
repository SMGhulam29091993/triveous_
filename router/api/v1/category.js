const express =  require("express");
const { verifyUser } = require("../../../utils/verifyUser");
const router = express.Router();
const categoryController = require("../../../controllers/categoryController.js");

router.post("/create-category", verifyUser, categoryController.createCategory);
router.get("/get-category", categoryController.getCategory);
router.get("/category-product-list/:id", categoryController.productListings);



module.exports = router;