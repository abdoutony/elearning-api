const express = require("express");
const router = express.Router();

module.exports = () => {
     
  router.get("/",(req,res)=>{
    res.status(200).send("Api routes")
  });
  return router;
};