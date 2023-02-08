const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async function (userData) {
    const firstInitial = userData.firstname.charAt(0);
    const username = `${firstInitial}.${userData.lastname}-${Math.floor(Math.random() * 1000)}`;

    const user = new User({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        username: username,
        role: userData.role
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    user.password = hash;

    await user.save();

    const token = jwt.sign({
        user: user
    }, process.env.SECRET, {
        expiresIn: '1d'
    });

    return token;
};

exports.login = async function (username, password) {
    const user = await User.findOne({
        username: username
    });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect username or password');
    }

   // Generate the refresh token
   const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  // Update the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // Generate the access token
  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  // Return the access token
  return accessToken 
};


exports.refreshToken = async (req, res) => {
  // Extract the refresh token from the request
  const refreshToken = req.body.refreshToken;

  // Check if the refresh token exists
  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(401).send("Unauthorized");

  // Generate a new access token
  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  // Return the new access token
  return res.json({ accessToken });
};

