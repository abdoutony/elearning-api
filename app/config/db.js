const mongoose = require("mongoose");
exports.connect = (dbUrl) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err.message);
    });
};

exports.close = async () => {
  await mongoose.connection.close();
};
