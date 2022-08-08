import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function ContactForm(props) {
  const ContactType = ["Telefone", "Email", "Whatsapp"]
  const { contact, setContact } = props.contact;
  const { addOrEditContact } = props.methods;
  const { open, setOpen } = props.open;

  const onHandleChange = (e) => {
    contact[e.target.name] = e.target.value;
    setContact(contact);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveButton = () => {
    addOrEditContact(contact);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {contact.id ? "Editar Contato" : "Novo Contato"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="contact-type"
          name="type"
          variant="standard"
          select
          label="Tipo"
          type="number"
          value={contact.type}
          onChange={onHandleChange}
          style={{ width: "150px" }}
        >
          {ContactType.map((option, index) => (
            <MenuItem key={option} value={index}>
              {option}
            </MenuItem>
          ))}
        </TextField>
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
          onChange={onHandleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveButton}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
