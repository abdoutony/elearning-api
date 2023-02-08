// controllers/ExampleController.js
const ExampleService = require('../services/crud');

exports.createExample = async (req, res) => {
  try {
    const create = await ExampleService.create(req.body);
    return res.status(201).json({msg:"Create with success" ,create:create});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getExamples = async (req, res) => {
  try {
    const gets = await ExampleService.gets();
    return res.status(200).json({ msg:"Get with success" ,gets:gets });
  } catch (error) {
    return res.status(500).json({ error: 'error server' });
  }
};

exports.getExample = async (req, res) => {
  try {
    const get = await ExampleService.get(req.params.id);
    return res.status(200).json({ msg:"Get with success" ,get:get });
  } catch (error) {
    return res.status(404).json({ error: 'error server' });
  }
};

exports.updateExample = async (req, res) => {
  try {
    const update = await ExampleService.update(req.params.id, req.body);
    return res.status(200).json({ msg:"update with success" ,update:update });
  } catch (error) {
    return res.status(404).json({ error: 'error server' });
  }
}

exports.deleteExample = async (req, res) => {
    try {
      await ExampleService.delete(req.params.id);
      return res.status(200).json({ msg:"Deleted succefully" });
    } catch (error) {
      return res.status(404).json({ error: 'error server' });
    }
  }