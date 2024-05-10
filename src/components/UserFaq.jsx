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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function UserFaq(props) {
  const [userProfile, setUserProfile] = React.useState([]);

  const getUserProfile = async () => {
    const response = await axios.get("https://sandbox.practical.me/api/faq", {
      headers: {
        Authorization: "Bearer " + props.token,
        Accept: "application/json",
      },
    });
    setUserProfile(response.data.data);
  };

  useEffect(() => {
    const response = getUserProfile();
  }, []);

  console.log("user FAQ ===", userProfile);
  return (
    <TableContainer component={Paper}>
      <span>
        <h2>FAQs</h2>
      </span>
      <h2>Wallet</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userProfile &&
            userProfile.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.question}</TableCell>
                <TableCell align="right">{row.answer}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
