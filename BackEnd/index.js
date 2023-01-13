const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const cors = require("cors");
let PORT = process.env.PORT || 11000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);
app.use(cors());
app.all("/*", (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "*");
  response.header("Access-Control-Expose-Headers", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH"
  );
  response.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use((err, req, res, next) => {
  res.status(500).json({
    error: true,
    message: err.message,
    data: null,
  });
});

app.listen(PORT, function () {
  console.log(`listening for the ${PORT} Number`);
});
