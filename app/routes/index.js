const express = require("express");
const router = express.Router();
const exampleRoutes = require("./example")
module.exports = () => {
     
  router.get("/",(req,res)=>{
    res.status(200).send("Api routes")
  });
  router.use("/example",exampleRoutes())
  return router;
};