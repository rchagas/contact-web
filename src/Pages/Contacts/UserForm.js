import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutline";

export default function UserForm(props) {
  const ContactType = ["Telefone", "Email", "Whatsapp"];
  const { user, setUser } = props.user;
  const { open, setOpen } = props.open;
  const { contact, setContact } = props.contact;
  const { addOrEditUser } = props.methods;

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleChange = (e) => {
    user[e.target.name] = e.target.value;
  };

  const onHandleContactChange = (e) => {
    if (e.target.name === "type")
      setContact({ ...contact, type: e.target.value, userId: user.id });
    else setContact({ ...contact, value: e.target.value, userId: user.id });
  };

  const addContact = () => {
    const updatedContacts = [...user.contacts, contact];
    console.log(contact);
    console.log(updatedContacts);
    setUser({ ...user, contacts: updatedContacts });
    setContact({ id: 0, value: "", type: 0, userId: user.id });
  };

  const saveButton = () => {
    addOrEditUser();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{user.id ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Contato"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={user.name}
          onChange={onHandleChange}
        />
        <Box>
          <Table>
            <TableBody>
              {Array.isArray(user.contacts)
                ? user.contacts
                    .sort((a, b) => a.type - b.type)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{ContactType[row.type]}</TableCell>
                        <TableCell colSpan={2}>{row.value}</TableCell>
                      </TableRow>
                    ))
                : []}
              <TableRow>
                <TableCell>
                  <TextField
                    id="contact-type"
                    name="type"
                    variant="standard"
                    select
                    label="Tipo"
                    type="number"
                    value={contact.type}
                    onChange={onHandleContactChange}
                    style={{ width: "150px" }}
                  >
                    {ContactType.map((option, index) => (
                      <MenuItem key={option} value={index}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="value"
                    label="Contato"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={contact.value}
                    onChange={onHandleContactChange}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={addContact}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveButton}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
