const {Category, Product} = require("../models");


module.exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            res.status(200).send({ message: "Category Already Exists!!", success: false });
            return;
        } else {
            const category = await Category.create({ name });
            res.status(200).send({ message: "Category created!!", success: true });
            return;
        }
    } catch (error) {
        next(error);
    }
}

module.exports.getCategory = async (req,res,next)=>{
    try {
        const category = await Category.findAll();
        return res.status(200).send({message : "Here are your categories!!", success : true, category})
    } catch (error) {
        next(error)
    }
}

module.exports.productListings = async (req,res,next)=>{
    try {
        const productListings = await Product.findAll({where : {categoryId: req.params.id}});
        if(productListings.length === 0){
            return res.status(401).send({message:"No product under this category", success : false});
        }
        res.status(200).send({message:"Here is the list of the products", success : true, productListings})
    } catch (error) {
        next(error);
    }
}