const mongodb = require("mongoose");

module.exports.mongoconnect = mongodb.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  //this is checking the DB Connection
  (error) => {
    if (!error) {
      console.log("DB Connection Successful");
    } else {
      console.log("DB Connection Failed");
    }
  }
);
