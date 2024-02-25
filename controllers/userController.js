const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
require("dotenv").config()


module.exports.signUpUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password,10);
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(200).send({message:"User already exists", success:true,});
            return;
        }
        await User.create({username, email, password : hashedPassword});
        res.status(200).send({message:"User Created Successfully", success:true})
    } catch (error) {
        next(error);
    }
};

module.exports.createSession = async (req,res,next)=>{
    try {
        const {email, password} = req.body;
        const user = User.findOne({email});
        if(!user){
            res.status(401).send({message: "User not found!!", success : false});
            return;
        }
        const isPassword = bcryptjs.compareSync(password, user.password);
        if(!isPassword){
            res.status(402).send({message: "Invalid username/password", success: false})
            return;
        }
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET)
    } catch (error) {
        next(error);
    }
}
