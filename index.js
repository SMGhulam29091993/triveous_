const express = require("express");
require("dotenv").config();
const PORT = 8000;
const morgan = require("morgan");
require("colors");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));




app.listen(PORT, ()=>{
    console.log(`The server is up and running on port : ${PORT}`.bgYellow);
})