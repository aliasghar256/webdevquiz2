import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import { useEffect } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function UserTable(props) {
  const [userProfile, setUserProfile] = React.useState({});

  const getUserProfile = async () => {
    const response = await axios.get(
      "https://sandbox.practical.me/api/user/profile",
      {
        headers: {
          Authorization: "Bearer " + props.token,
          Accept: "application/json",
        },
      }
    );
    setUserProfile(response.data.data);
  };

  useEffect(() => {
    const response = getUserProfile();
  }, []);

  console.log("user profile ===", userProfile);
  console.log("Wallet ===", userProfile.wallet);

  return (
    <TableContainer component={Paper}>
      <span>
        <h2>Name: {userProfile.first_name + " " + userProfile.sur_name}</h2>
      </span>
      <h2>Wallet</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userProfile.wallet &&
            userProfile.wallet.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order_id}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
