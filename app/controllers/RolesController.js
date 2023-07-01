const CrudService = require("../services/crud");
const Role = require("../models/role");
exports.getAllRoles = async (req, res) => {
  try {
    const gets = await CrudService.gets(Role);
    return res.status(200).json({ msg: "Get with success", data: gets });
  } catch (error) {
    return res.status(500).json({ error: "error server" });
  }
};

exports.getOneRole = async (req, res) => {
  try {
    const get = await CrudService.get(req.params.id, Role);
    return res.status(200).json({ msg: "Get with success", data: get });
  } catch (error) {
    return res.status(404).json({ error: "error server" });
  }
};

exports.addNewRole = async (req, res) => {
  try {
    const create = await CrudService.create(req.body, Role);
    return res.status(201).json({ msg: "Create with success", data: create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const update = await CrudService.update(req.params.id, req.body, Role);
    return res.status(200).json({ msg: "update with success", update: update });
  } catch (error) {
    return res.status(404).json({ error: "error server" });
  }
};
exports.deleteRole = async (req, res) => {
  try {
    await CrudService.delete(req.params.id, Role);
    return res.status(200).json({ msg: "Deleted succefully" });
  } catch (error) {
    return res.status(404).json({ error: "error server" });
  }
};
