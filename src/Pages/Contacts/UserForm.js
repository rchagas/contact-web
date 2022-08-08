import React  from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
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

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleChange = (e) => {
    user[e.target.name] = e.target.value;
  };

  const onHandleContactChange = (e) => {
    contact[e.target.name] = e.target.value;
    setContact({...contact});
  };

  const addContact = () => {
    setUser({...user, contacts: user.contacts.push(contact)})
    console.log(user);
    //setContact({...contact, value: '', type: 0});
  }

  const saveButton = () => {
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
          name="value"
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
              {user.contacts
                .sort((a, b) => a.type - b.type)
                .map((row) => (
                  <TableRow>
                    <TableCell>{ContactType[row.type]}</TableCell>
                    <TableCell colSpan={2}>{row.value}</TableCell>
                  </TableRow>
                ))}
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
                    defaultValue={contact.value}
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
