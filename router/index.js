const express =  require("express");
const router = express.Router();


router.use("/api", require("./api/index.js"));
router.get("/test", (req,res)=>{
    res.status(200).send({message : "The Backed is Working Fine"})
})

module.exports = router;