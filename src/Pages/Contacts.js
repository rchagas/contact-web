import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContactRow from "./ContactRow";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/AddCircleOutline';

export default function Contacts() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("https://localhost:7117/api/User");
      setUsers(result.data);
    })();
  }, []);

  const deleteUser = async (user) => {
    await axios.delete("https://localhost:7117/api/User/" + user.id);
    setUsers(users.filter(val => val.id !== user.id))
  }

  const deleteContact = async (contact) => {
    await axios.delete("https://localhost:7117/api/User/Contact/" + contact.id);
    window.location.reload();
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Usuário</TableCell>
            <TableCell align="left">Telefone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Whatapp</TableCell>
            <TableCell align="left"><IconButton><AddIcon/></IconButton></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <ContactRow key={row.id} row={row} value={{ row, deleteUser, deleteContact}}></ContactRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
