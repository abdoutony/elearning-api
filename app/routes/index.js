const express = require("express");
const router = express.Router();
const exampleRoutes = require("./example")
const authRoutes= require("./auth")
module.exports = () => {
     
  router.get("/",(req,res)=>{
    res.status(200).send("Api routes")
  });
  router.use("/auth",authRoutes())
  router.use("/example",exampleRoutes())
  return router;
};