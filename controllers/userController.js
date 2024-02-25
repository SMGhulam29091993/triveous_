const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
require("dotenv").config()


module.exports.signUpUser = async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            res.status(200).send({message : "User already Exists", success : false});
            return;
        }
        const user  = await User.create({username, email, password : hashedPassword });
        res.status(200).send({message : "User register successfuly", success : true})
    } catch (error) {
        // res.status(404).send({message : "Error in resgistering the user", success :false});
        // console.log(`Register :  ${error.message}`);
        next(error);
    }
};

module.exports.createSession = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: "User not found!!", success: false });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid username/password", success: false });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie("jwtToken", token, { httpOnly: true });
        // Return user data without password
        return res.status(200).send({
            message: "User logged in successfully!!",
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token
        });
    } catch (error) {
        next(error);
    }
};


module.exports.updateUser = async (req,res,next)=>{
    try {
        if(req.user.id !== parseInt(req.params.id)){
            res.status(404).send({message : "You are not authorized", success : false});
            return;
        }
        if (req.body.password){
            req.body.password = await bcryptjs.hashSync(req.body.password, 10);
        }
        const [updatedRowsCount] = await User.update(req.body, {
            where: { id: req.params.id },
        });
        
        // If no rows were updated, the user does not exist
        if (updatedRowsCount === 0) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        
        // Fetch the updated user
        const updatedUser = await User.findByPk(req.params.id);
        
        // Return the updated user object
        return res.status(200).send({
            message: "User updated successfully",
            success: true,
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            },
        });
        
    } catch (error) {
        next(error)
    }  
}

module.exports.getUser = async (req,res,next)=>{
    if(req.user.id !== parseInt(req.params.id)){
        res.status(404).send({message : "You are not authorized", success : false});
        return;
    }
    try {
        const user = await User.findByPk(req.params.id);
        return res.status(200).send({message: "Here are the user details!!", success:true, 
        user:{
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }})
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) {
        res.status(404).send({ message: "You are not authorized", success: false });
        return;
    }
    try {
        const deletedRowsCount = await User.destroy({
            where: { id: req.params.id },
        });
        if (deletedRowsCount === 0) {
            // No user was deleted
            return res.status(404).send({ message: "User not found", success: false });
        }
        return res.status(200).send({ message: "User Deleted Successfully!!", success: true });
    } catch (error) {
        next(error);
    }
}
