const jwt = require('jsonwebtoken');
const User = require("../models/user")
require("dotenv").config()

exports.isAdmin = function (req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(401).send({success: false, msg: 'Unauthorized. Admin role required.'});
    }

    next();
};
exports.isTeacher = function (req, res, next) {
    if (req.user.role !== 'teacher') {
        return res.status(401).send({success: false, msg: 'Unauthorized. Teacher role required.'});
    }
    next();
};
exports.isTeacherOrAdmin = function (req, res, next) {
    if (req.user.role !== 'teacher' || req.user.role !== 'admin') {
        return res.status(401).send({success: false, msg: 'Unauthorized. Admin or Teacher role required.'});
    }
    next();
};


exports.verifyToken = async function (req, res, next) {
    const accessToken = req.header('authorization');
    if (!accessToken) return res.status(401).json({ message: 'No access token provided' });
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({
            message: 'Invalid token'
        });
    }
}
