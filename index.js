const express = require("express");
require("dotenv").config();
const PORT = 8000;
const morgan = require("morgan");
require("colors");
const errorHandler = require("./config/errorHandlerMiddleware.js");
const cookieParser = require("cookie-parser");


const app = express();
const db = require("./config/mysql.js")
// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser());


app.use("/", require("./router"))


app.listen(PORT, ()=>{
    console.log(`The server is up and running on port : ${PORT}`.bgYellow);
})