const mongoose = require("mongoose");
require("dotenv").config();
const configurations = require("../config/app")
const exampleSeed = require("./data/example.json");
const userSeed = require("./data/user.json");
const {Example} = require("../models/example")
const User = require("../models/user")
mongoose.set("strictQuery", false);
mongoose
  .connect(configurations.database.dev, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    // await Example.insertMany(exampleSeed);
    await User.insertMany(userSeed);
    mongoose.connection.close(function () {
      console.log("** Disconnected from database **");
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.message);
  });