// services/ExampleService.js
const {Example} = require('../models/example');

exports.create = async (exampleData) => {
  try {
    const example = await Example.create(exampleData);
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.gets = async () => {
  try {
    const examples = await Example.find();
    return examples;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.get = async (id) => {
  try {
    const example = await Example.findById(id);
    if (!example) throw new Error('Example not found');
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (id, exampleData) => {
  try {
    const example = await Example.findByIdAndUpdate(id, exampleData, { new: true });
    if (!example) throw new Error('Example not found');
    return example;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    const example = await Example.findByIdAndDelete(id);
    if (!example) throw new Error('Example not found');
    return 'Example deleted';
  } catch (error) {
    throw new Error(error.message);
  }
};
