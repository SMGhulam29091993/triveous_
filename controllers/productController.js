const {Product} = require("../models");


module.exports.createProduct = async (req,res,next)=>{
    const {title, price, description, availability, categoryId} = req.body;
    try {
        const product = await Product.create({title,price,description,availability,categoryId});
        if(!product){
            res.status(401).send({message:"Error in creating the product", success: false});
            return;
        }
        res.status(200).send({message:"Product created successfully!!", success : true, product})
    } catch (error) {
        next(error);
    }
}

module.exports.getProductDetails = async (req,res,next)=>{
    try {
        const productDetails = await Product.findOne({where : {id : req.params.id}});
        res.status(200).send({message:"Here are the product details!!", success:true, productDetails});
    } catch (error) {
        next(error)
    }
}