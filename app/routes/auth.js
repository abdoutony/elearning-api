const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { verifyToken } = require('../middleware/auth');
const {isAdmin} = require("../middleware/auth")
module.exports= ()=>{
        router.post('/register', AuthController.register);
        router.post('/login', AuthController.login);
        router.post('/refresh-token', AuthController.refreshToken);
        router.get('/profile', verifyToken, AuthController.getProfile);
    return router
}

