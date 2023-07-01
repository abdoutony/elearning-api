const express = require("express");
const router = express.Router();
const exampleRoutes = require("./example");
const courseRoutes = require("./course");
const authRoutes = require("./auth");
const rolesRoutes = require("./roles");
const roles = require("./roles");
module.exports = () => {
  router.get("/", (req, res) => {
    res.status(200).send("Api routes");
  });
  router.use("/auth", authRoutes());
  router.use("/example", exampleRoutes());
  router.use("/course", courseRoutes());
  router.use("/role", rolesRoutes());
  return router;
};
