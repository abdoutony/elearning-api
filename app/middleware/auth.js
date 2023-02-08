const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.authenticate = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send({success: false, msg: 'Unauthorized.'});
        }

        req.user = user;
        next();
    })(req, res, next);
};

exports.isAdmin = function (req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(401).send({success: false, msg: 'Unauthorized. Admin role required.'});
    }

    next();
};

exports.verifyToken = async function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.user._id);
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
