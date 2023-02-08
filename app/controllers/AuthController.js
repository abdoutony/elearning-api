const authService = require('../services/auth.service');

exports.register = async function (req, res, next) {
    try {
        const userData = req.body;
        const token = await authService.register(userData);
        return res.json({
            message: 'User registered successfully',
            token: token
        });
    } catch (err) {
        return next(err);
    }
};

exports.login = async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const token = await authService.login(username, password);
        return res.json({
            message: 'User logged in successfully',
            token: token
        });
    } catch (err) {
        return next(err);
    }
};
