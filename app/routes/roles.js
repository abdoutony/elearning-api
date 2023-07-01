const express = require("express");
const RolesController = require(".././controllers/RolesController");
const router = express.Router();
module.exports = () => {
  router.get("/", RolesController.getAllRoles);
  router.post("/", RolesController.addNewRole);
  router.get("/:id", RolesController.getOneRole);
  router.put("/:id", RolesController.updateRole);
  router.delete("/:id", RolesController.deleteRole);

  return router;
};
