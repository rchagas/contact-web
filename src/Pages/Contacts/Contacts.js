import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContactRow from "./ContactRow";
import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import UserForm from "./UserForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = React.useState(false);

  const [contact, setContact] = useState({
    id: 0,
    type: 0,
    value: "",
    userId: 0,
  });

  const [user, setUser] = useState({
    id: 0,
    name: "",
    contacts: [],
  });

  const apiUrl = "https://localhost:7117/api/";

  async function fetchData() {
    const result = await axios(apiUrl + "User");
    setUsers(result.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (user) => {
    await axios.delete(apiUrl + "User/" + user.id);
    fetchData();
  };

  const deleteContact = async (contact) => {
    await axios.delete(apiUrl + "User/Contact/" + contact.id);
    fetchData();
  };


  const addOrEditContact = async () => {
      const user = users.find((obj) => obj.id === contact.userId);
      if (contact.id) {
        const newContact = user.contacts.find((obj) => obj.id === contact.id);
        newContact.type = contact.type;
        newContact.value = contact.value;
      } else {
        user.contacts.push(contact);
      }
      await axios.put(apiUrl + "User", user);
      fetchData();
  };

  const addOrEditUser = async () => {
    if (user.id) {
      await axios.put(apiUrl + "User", user);
    } else {
      await axios.post(apiUrl + "User", user);
    }
    fetchData();
  };


  const handleAddUserButton = () => {
    setUser({
      id: 0,
      name: "",
      contacts: [],
    });

    setContact({
      id: 0,
      type: 0,
      value: "",
      userId: 0,
    });

    setNewUser(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{fontWeight: '900'}}>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell align="center">Usuário</StyledTableCell>
              <StyledTableCell align="center">Telefone</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Whatapp</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={handleAddUserButton}
                  sx={{color: 'white'}}
                >
                  Novo Usuário
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <ContactRow
                key={row.id}
                value={row}
                newUserButton={{ newUser, setNewUser }}
                user={{ user, setUser }}
                contact={{ contact, setContact }}
                methods={{ addOrEditContact, deleteUser, deleteContact }}
              ></ContactRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        open={{ open: newUser, setOpen: setNewUser }}
        user={{ user, setUser }}
        contact={{ contact, setContact }}
        methods={{ addOrEditUser }}
      ></UserForm>
    </>
  );
}
