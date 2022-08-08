import React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

export default function CollapsibleTableRow(props) {
  const ContactType = ["Telefone", "Email", "Whatsapp"];
  const { deleteContact } = props.methods;
  const row = props.value;
  const { setContact } = props.contact;
  const { setOpen } = props.open;

  const handleEditContactButton = (contact) => {
    setContact(contact);
    setOpen(true);
  };

  return (
    <TableRow>
      <TableCell align="left">{ContactType[row.type]}</TableCell>
      <TableCell align="left">{row.value}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => handleEditContactButton(row)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteContact(row)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}