const jwt = require("jsonwebtoken");


module.exports.verifyUser =  (req,res,next)=>{
    let token;
    // check if the token is in the authorization header
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        token = req.headers.authorization.split(" ")[1];
        console.log("Header Token : ", token);
    }//checking if the token is not in authorization header then check in the cookies
    else if(req.cookies.jwtToken){
        token = req.cookies.jwtToken;
        console.log("Cookies Token : ", token);
    }
    if(!token){
        res.status(400).send({message : "Unauthorized user", success : false});
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            console.log("Token verification error", err);
            res.status(401).send({message : "TOken verification error!!", success : false});
            return;
        }
        req.user = user;
        console.log("Token Decode User : ", user);
        next();
    })
}