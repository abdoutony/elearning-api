// routes/examples.js
const express = require('express');
const router = express.Router();
const ExampleController = require('../controllers/ExampleController');

module.exports =()=>{
    router.post('/', ExampleController.createExample);
    router.get('/', ExampleController.getExamples);
    router.get('/:id', ExampleController.getExample);
    router.patch('/:id', ExampleController.updateExample);
    router.delete('/:id',ExampleController.deleteExample)
    return router
}