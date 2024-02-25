const express =  require("express");
const router = express.Router();


router.use("/user", require("./user.js"));
router.use("/category", require("./category.js"));



module.exports = router;