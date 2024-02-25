const express =  require("express");
const router = express.Router();


router.use("/user", require("./user.js"));
router.use("/category", require("./category.js"));
router.use("/product", require("./product.js"))
router.use("/cart", require("./cart.js"));

module.exports = router;