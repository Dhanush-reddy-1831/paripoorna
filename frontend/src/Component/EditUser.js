import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const toplocation = [
  { label: "Bangalore" },
  { label: "New Delhi" },
  { label: "Mumbai" },
  { label: "Chennai" },
  { label: "Hydrabad" },
];
function EditUser({ setOpen, open, selectedUser, getData }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("selected user", selectedUser);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    dob: "",
    age: "",
    location: "",
  });
  const [formDataErr, setformDataErr] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    dob: null,
    age: "",
    location: "",
  });
  const validateFields = (formData) => {
    let errorInForm = false;
    let errObj = {
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNumber: "",
      dob: "",
      age: "",
      location: "",
    };
    if (!formData.firstName) {
      errObj.firstName = "This field is required";
      errorInForm = true;
    } else if (formData.firstName.trim().length !== formData.firstName.length) {
      errObj.firstName = "First Name field accepts only alphabet and space";
      errorInForm = true;
    } else if (!/^[a-zA-Z ]{1,30}$/.test(formData.firstName)) {
      errObj.firstName = "First Name field accepts only alphabet and space";
      errorInForm = true;
    }

    if (!formData.lastName) {
      errObj.lastName = "This field is required";
      errorInForm = true;
    } else if (formData.lastName.trim().length !== formData.lastName.length) {
      errObj.lastName = "Last Name field accepts only alphabet and space";
      errorInForm = true;
    } else if (!/^[a-zA-Z ]{1,30}$/.test(formData.lastName)) {
      errObj.lastName = "Last Name field accepts only alphabet and space";
      errorInForm = true;
    }

    if (!formData.emailId) {
      errObj.emailId = "This field is required";
      errorInForm = true;
    } else if (
      // eslint-disable-next-line
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.emailId)
    ) {
      errObj.emailId = "Enter valid E-mail ID";
      errorInForm = true;
    }

    if (!formData.mobileNumber) {
      errObj.mobileNumber = "This field is required";
      errorInForm = true;
    } else if (!/^(\+|\d)[0-9]{7,16}$/.test(formData.mobileNumber)) {
      errObj.mobileNumber = "Enter valid Mobile Number";
      errorInForm = true;
    }

    if (!formData.dob) {
      errObj.dob = "This field is required";
      errorInForm = true;
    }

    if (!formData.age) {
      errObj.age = "This field is required";
      errorInForm = true;
    }

    if (!formData.location) {
      errObj.location = "This field is required";
      errorInForm = true;
    }
    setformDataErr({ ...errObj });
    return errorInForm;
  };
  useEffect(() => {
    setformData({ ...selectedUser });
  }, [selectedUser]);
  const updateData = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let editProduct = async (ID) => {
    try {
      let response = await axios.put(
        `http://localhost:7000/users/editUser/${selectedUser._id}`,
        formData
      );
    } catch (err) {
      console.log("err", err);
    }
    getData();
  };
  const editErr = () => {
    if (!validateFields(formData)) {
      setformData({ ...formData });
      setOpen(false);
    }
  };
  const onBlurHandler = (e) => {
    if (e.target.value && e.target.value.trim().length > 0) {
      setformDataErr((prev) => ({ ...prev, [e.target.name]: "" }));
    } else {
      setformDataErr((prev) => ({
        ...prev,
        [e.target.name]: "This field is required",
      }));
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box container width="50vw" maxHeight={""} padding="10px">
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
              padding="5px"
            >
              Edit Form
            </Typography>
            <Grid
              container
              className="d-flex justify-content-space-between align-items-center px-4 pt-2"
              spacing={2}
              paddingBottom="10px"
            >
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter First Name"
                  id="outlined-basic"
                  //   label="Outlined"
                  variant="outlined"
                  name="firstName"
                  onChange={updateData}
                  value={formData.firstName}
                />
                <span style={{ color: "red" }}>{formDataErr.firstName}</span>
              </Grid>
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Last Name"
                  id="outlined-basic"
                  variant="outlined"
                  name="lastName"
                  onChange={updateData}
                  value={formData.lastName}
                  onBlur={onBlurHandler}
                />
                <span style={{ color: "red" }}>{formDataErr.lastName}</span>
              </Grid>
            </Grid>
            <Grid
              container
              className="d-flex justify-content-space-between align-items-center px-4 pt-2"
              spacing={2}
              paddingBottom="10px"
            >
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter EmailId"
                  id="outlined-basic"
                  variant="outlined"
                  name="emailId"
                  onChange={updateData}
                  value={formData.emailId}
                />
                <span style={{ color: "red" }}>{formDataErr.emailId}</span>
              </Grid>
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  Mobile Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Mobile Number"
                  id="outlined-basic"
                  //   label="Outlined"
                  variant="outlined"
                  name="mobileNumber"
                  onChange={updateData}
                  value={formData.mobileNumber}
                />
                <span style={{ color: "red" }}>{formDataErr.mobileNumber}</span>
              </Grid>
            </Grid>
            <Grid
              container
              className="d-flex justify-content-space-between align-items-center px-4 pt-2"
              spacing={2}
              paddingBottom="10px"
            >
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  DOB
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter DOB"
                  id="outlined-basic"
                  variant="outlined"
                  name="dob"
                  onChange={updateData}
                  value={formData.dob}
                />
                <span style={{ color: "red" }}>{formDataErr.dob}</span>
              </Grid>
              <Grid item md={6} sm={6} lg={6}>
                <Typography display={"flex"} justifyContent="start">
                  Age
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your Age"
                  id="outlined-basic"
                  //   label="Outlined"
                  variant="outlined"
                  name="age"
                  onChange={updateData}
                  value={formData.age}
                />
                <span style={{ color: "red" }}>{formDataErr.age}</span>
              </Grid>
            </Grid>
            <Grid
              container
              className="d-flex justify-content-space-between align-items-center px-4 pt-2"
              spacing={2}
              paddingBottom="10px"
            >
              <Grid item md={12} sm={12} lg={12}>
                <Typography display={"flex"} justifyContent="start">
                  Location
                </Typography>
                <Autocomplete
                  value={selectedUser.location}
                  fullWidth
                  disablePortal
                  options={toplocation}
                  id="combo-box-demo"
                  onChange={(e, value) => {
                    setformData({ ...formData, location: value.label });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
                <span style={{ color: "red" }}>{formDataErr.location}</span>
              </Grid>
            </Grid>
            <Grid
              container
              className="d-flex justify-content-space-between align-items-center px-4 pt-2"
              spacing={2}
            >
              <Grid item md={12} sm={12} lg={12}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => {
                    editProduct();
                    editErr();
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default EditUser;
