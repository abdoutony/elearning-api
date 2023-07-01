// services/ExampleService.js
// const { Example } = require("../models/example");

exports.create = async (exampleData, Model) => {
  try {
    const example = await Model.create(exampleData);
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.gets = async (Model) => {
  try {
    const examples = await Model.find();
    return examples;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.get = async (id, Model) => {
  try {
    const example = await Model.findById(id);
    if (!example) throw new Error(" not found");
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (id, exampleData, Model) => {
  try {
    const example = await Model.findByIdAndUpdate(id, exampleData, {
      new: true,
    });
    if (!example) throw new Error(" not found");
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (id, Model) => {
  try {
    const example = await Model.findByIdAndDelete(id);
    if (!example) throw new Error(" not found");
    return " deleted";
  } catch (error) {
    throw new Error(error.message);
  }
};
