const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const secretKey="10";

app.get("/", (req,res)=>{
  res.json({
    message: "a simple api"
  })
})

app.post("/login",(req,res)=>{
  const user={
    id:1,
    username:"anil",
    email:"abc@a"
  }
  jwt.sign({user}, secretKey, {expiresIn:'300s'},(err, token)=>{
    res.json({
      token
    })
  })
})

app.post("/profile", verifyToken, (req,res)=>{
   jwt.verify(req.token , secretKey, (err, authData)=>{
     if(err){
       res.send({
         result:"Invalid Token"
       })
     }
     else{
       res.json({
         message:"Profile Accessed",
         authData
       })
     }
   });

})
function verifyToken(req,res,next){
  const bearerHeader= req.headers['authorization'];
  if(typeof bearerHeader!== 'undefined'){
   const bearer = bearerHeader.split(" ");
   const token = bearer[1];
   req.token= token;
   next()
  }
  else{
    res.send({
      message:"Token not valid "
    })
  }
}

app.listen(5000, ()=>{
  console.log("app is runing in port 5000");
})
