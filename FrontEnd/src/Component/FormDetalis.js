/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import formdata from "./formdata.css";
import axios, { Axios } from "axios";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Data from "./Data";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const toplocation = [
  { label: "Bangalore" },
  { label: "New Delhi" },
  { label: "Mumbai" },
  { label: "Chennai" },
  { label: "Hydrabad" },
];
function FormDetalis() {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    dob: null,
    age: "",
    location: "",
  });

  const [data, setdata] = useState([]);
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
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const [value, setValue] = useState(null);

  const getDobDate = (newValue, value) => {
    console.log("val", value);
    let date = new Date(newValue);
    console.log("date", date);
    setValue(newValue);
    setformData({
      ...formData,
      dob: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    });
  };

  useEffect(() => {
    let calculate_age = () => {
      let today = new Date();
      let birthDate = new Date(formData.dob); // create a date object directly from `dob1` argument
      let age_now = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      if (formData.dob !== null) {
        setformData({
          ...formData,
          age: age_now,
        });
      }
      return age_now;
    };
    calculate_age();
  }, [formData.dob]);
  console.log("formData", formData);

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

  const onDateChange = (date) => {
    setformData((prev) => ({ ...prev, date }));
    if (date) {
      setformDataErr((prev) => ({ ...prev, date: "" }));
    } else {
      setformDataErr((prev) => ({
        ...prev,
        date: "This field is required",
      }));
    }
  };
  let getData = async () => {
    try {
      let res = await axios.get("http://localhost:7000/users/users");
      console.log("res", res);
      let alldata = res.data.data;
      setdata(alldata);
    } catch (err) {
      console.log(err);
    }
  };

  let postData = async () => {
    try {
      let details = await axios.post(
        "http://localhost:7000/users/addusers",
        formData
      );
      // setdata(details);
      getData();
      // return { details };
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData()
  }, []);
  const handleSubmit = async () => {
    if (!validateFields(formData)) {
      setformData({ ...formData });
      postData();
      getData();
      // try {
      //   let details = await axios.post(
      //     "http://localhost:7000/users/addusers",
      //     formData
      //   );
      //   setdata(details);
      //   return { details };
      // } catch (err) {
      //   console.log(err);
      // }
      setformData({
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNumber: "",
        dob: null,
        age: "",
        location: "",
      });
      setformDataErr({
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNumber: "",
        dob: null,
        age: "",
        location: "",
      });
    }
  };

  return (
    <Box>
      <Box display={"flex"}>
        <Box
          container
          sx={{ border: "1px dotted grey" }}
          width="50vw"
          maxHeight={""}
          padding="10px"
        >
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
                value={formData.firstName}
                onChange={(e) => handleFormData(e)}
                onBlur={onBlurHandler}
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
                value={formData.lastName}
                onChange={(e) => handleFormData(e)}
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
                value={formData.emailId}
                onBlur={onBlurHandler}
                onChange={(e) => handleFormData(e)}
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
                value={formData.mobileNumber}
                onBlur={onBlurHandler}
                onChange={(e) => handleFormData(e)}
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
              {/* <TextField
                fullWidth
                placeholder="Enter DOB"
                id="outlined-basic"
                variant="outlined"
                name="dob"
                value={formData.dob}
                onChange={(e) => handleFormData(e)}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    getDobDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
                value={formData.age}
                onChange={(e) => handleFormData(e)}
                onBlur={onBlurHandler}
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
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={toplocation}
                //   sx={{ width: 960 }}
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box width={"50%"}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
            width="100%"
            height="560px"
            frameborder="0"
            style={{ border: "0" }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </Box>
      </Box>
      <Box>
        <Data data={data} getData={getData} />
      </Box>
    </Box>
  );
}

export default FormDetalis;
