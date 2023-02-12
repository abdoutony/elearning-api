const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async function (userData) {
    const firstInitial = userData.firstname.charAt(0);
    const username = `${firstInitial}.${userData.lastname}-${Math.floor(Math.random() * 1000)}`;
    // const hash = await bcrypt.hash(userData.password, 10);
    const user = new User({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password:userData.password,
        username: username,
    });
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

    return {refreshToken,accessToken};
};

exports.login = async function (username, password) {
  // console.log(username,password)
    const user = await User.findOne({username});
    console.log(password)
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    // const isMatch = await bcrypt.compare(password, user.password);
   const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch){
    throw new Error("Incorract username or password")
   }
   console.log(isMatch)
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
  return {accessToken,refreshToken} 
};


exports.refreshToken = async (token) => {
  // Check if the refresh token exists
  console.log(typeof token)
  const user = await User.findOne({refreshToken:token}).exec();;
  console.log(user)
  if (!user) throw new Error("Unauthorized");
  // Generate a new access token
  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  // Return the new access token
  return accessToken
};


exports.getProfile = async (userId) => {
  return User.findById(userId);
};
