const express =  require("express");
const router = express.Router();
const userController = require("../../../controllers/userController.js");

router.get("/test", (req,res)=>{
    res.status(200).send({message : "The Backed is Working Fine"})
});

router.post("/sign-up", userController.signUpUser);

module.exports = router;