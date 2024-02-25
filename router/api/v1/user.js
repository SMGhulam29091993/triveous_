const express =  require("express");
const router = express.Router();
const userController = require("../../../controllers/userController.js");
const { verifyUser } = require("../../../utils/verifyUser.js");


router.get("/test", (req,res)=>{
    res.status(200).send({message : "The Backed is Working Fine"})
});

router.post("/sign-up", userController.signUpUser);
router.post("/log-in", userController.createSession);
router.post("/update-user/:id", verifyUser, userController.updateUser)
router.get("/get-user/:id", verifyUser, userController.getUser);
router.post("/delete/:id", verifyUser, userController.deleteUser);

module.exports = router;