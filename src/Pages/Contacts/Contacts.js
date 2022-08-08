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
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import UserForm from "./UserForm";

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = React.useState(false);
  const [newContact, setNewContact] = React.useState(false);
  
  const [contact, setContact] = useState({
    id: 0,
    type: 0,
    value: '',
    userId: 0,
  })

  const [user, setUser] = useState({
    id: 0,
    name: '',
    contacts: []
  })

  const apiUrl = "https://localhost:7117/api/";

  useEffect(() => {
    (async () => {
      const result = await axios(apiUrl + "User");
      setUsers(result.data);
    })();
  }, []);

  const deleteUser = async (user) => {
    await axios.delete(apiUrl + "User/" + user.id);
    setUsers(users.filter((val) => val.id !== user.id));
  };

  const deleteContact = async (contact) => {
    await axios.delete(apiUrl + "User/Contact/" + contact.id);
    const user = users.find((obj) => obj.id === contact.userId);
    user.contacts.splice(
      user.contacts.findIndex((obj) => obj.id === contact.id),
      1
    );
    setUsers(users);
  };

  const addOrEditContact = async (contact) => {
    console.log(contact);
    const user = users.find((obj) => obj.id === contact.userId);
    if (contact.id) {
      const newContact = user.contacts.find((obj) => obj.id === contact.id);
      newContact.type = contact.type;
      newContact.value = contact.value;
    } else {
      user.contacts.push(contact);
    }
    await axios.put(apiUrl + "User", user);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Usuário</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Whatapp</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setNewUser(true)}
                >
                  Novo Usuário
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <ContactRow
                key={row.id}
                value={row}
                newUserButton={{ newUser, setNewUser }}
                user={{ user, setUser}}
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
      ></UserForm>
    </>
  );
}
