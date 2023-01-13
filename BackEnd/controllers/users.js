let users = require("../models/users");

let getAlldetails = async (req, res, next) => {
  try {
    let user = await users.find().lean();
    res.json({
      error: false,
      message: "All  Deatils",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

let addUser = async (req, res, next) => {
  console.log(req.body);
  let { firstName, lastName, emailId, mobileNumber, dob, age, location } =
    req.body;
  try {
    await users.insertMany([
      {
        firstName,
        lastName,
        emailId,
        mobileNumber,
        dob,
        age,
        location,
      },
    ]);
    res.json({
      error: false,
      message: "user added successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
let editUser = async (req, res, next) => {
  console.log("edit", req.params._id);
  let { _id, firstName, lastName, emailId, dob, age, mobileNumber, location } =
    req.body;
  try {
    await users.updateOne(
      { _id: _id },
      {
        $set: {
          firstName,
          lastName,
          emailId,
          dob,
          age,
          mobileNumber,
          location,
        },
      }
    );
    res.json({
      error: false,
      message: "user edited successfully",
      data: { firstName, lastName, emailId, dob, age, mobileNumber, location },
    });
  } catch (err) {
    next(err);
    // console.log(err);
  }
};
let deleteUser = async (req, res, next) => {
  let { _id } = req.params;
  try {
    await users.deleteOne({ _id: req.params._id });
    res.json({
      error: false,
      message: "user deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAlldetails,
  addUser,
  editUser,
  deleteUser,
};
