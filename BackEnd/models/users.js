const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = new Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  emailId: {
    type: String,
    minlength: 3,
    maxlength: 100,
  },
  mobileNumber: {
    type: String,
    minlength: 3,
    maxlength: 100,
  },
  dob: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  age: {
    type: String,
    minlength: 1,
    maxlength: 2,
  },
  location: {
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", usersSchema);
