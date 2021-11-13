const express = require("express");
const app = express.Router();

app.get('/:userID',(req,res)=>{
    console.log("Fetch profile data")
})
module.exports=app;
