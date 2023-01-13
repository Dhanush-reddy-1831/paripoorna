import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditUser from "./EditUser";
import FormDetalis from "./FormDetalis";
function Data({data,getData}) {
  // const [data, setdata] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [open, setOpen] = React.useState(false);

  // let getData = async () => {
  //   try {
  //     let res = await axios.get("http://localhost:7000/users/users");
  //     console.log("res", res);
  //     let alldata = res.data.data;
  //     setdata(alldata);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const deleteData = async (_id) => {
    console.log(" deleted user", _id);
    try {
      let res = await axios.delete(
        `http://localhost:7000/users/deleteusers/${_id}`
      );
      console.log(res, "res");
    } catch (err) {
      console.log("err", err);
    }
    getData();
  };
  const editData = (value) => {
    setSelectedUser(value);
    setOpen(true);
  };
  return (
    <Box sx={{ width: "100%", paddingTop: "100px" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">FirstName</TableCell>
              <TableCell align="center">LastName</TableCell>
              <TableCell align="center">Email ID</TableCell>
              <TableCell align="center">Mobile No</TableCell>
              <TableCell align="center">DOB</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Location</TableCell>

              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{val.firstName}</TableCell>
                  <TableCell align="center">{val.lastName}</TableCell>
                  <TableCell align="center">{val.emailId}</TableCell>
                  <TableCell align="center">{val.mobileNumber}</TableCell>
                  <TableCell align="center">{val.dob}</TableCell>
                  <TableCell align="center">{val.age}</TableCell>
                  <TableCell align="center">{val.location}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => editData(val)} />
                    <DeleteIcon onClick={() => deleteData(val._id)} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUser
        setOpen={setOpen}
        open={open}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getData={getData}
      />
    </Box>
  );
}

export default Data;
