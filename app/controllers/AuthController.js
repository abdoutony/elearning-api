const authService = require('../services/auth');

exports.register = async function (req, res, next) {
    try {
        const userData = req.body;
        const {accessToken,refreshToken} = await authService.register(userData);
        return res.json({
            message: 'User registered successfully',
            accessToken,
            refreshToken
        });
    } catch (err) {
        return next(err);
    }
};

exports.login = async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username,password)
        // console.log('dd')
        const {accessToken,refreshToken} = await authService.login(username, password);
        return res.json({
            message: 'User logged in successfully',
            accessToken,
            refreshToken
        });
    } catch (err) {
        return next(err);
    }
};


exports.refreshToken = async function(req,res,next){
    try{
    // Extract the refresh token from the request
    const refreshToken = req.body.refreshToken;
    const accessToken = await authService.refreshToken(refreshToken)
    res.status(200).json({accessToken})
    }catch(err){
        return next(err)
    }
}


exports.getProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await authService.getProfile(userId);
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
};

