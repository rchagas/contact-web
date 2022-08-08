import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ContactForm from "./ContactForm";

import { Button, Collapse, Table, TableBody, TableHead } from "@mui/material";
import Box from "@mui/system/Box";
import CollapsibleTableRow from "./CollapsibleTableRow";

export default function ContactRow(props) {
  const { addOrEditContact, deleteUser, deleteContact } = props.methods;
  const row = props.value;
  
  const [open, setOpen] = React.useState(false);
  const [newContact, setNewContact] = React.useState(false);

  const { user, setUser } = props.user;
  const { newUser, setNewUser } = props.newUserButton;
  
  const [contact, setContact] = useState({
    id: 0,
    type: 0,
    value: '',
    userId: 0,
  })
  
  useEffect(() => {

  },[contact]);

  function ContactTypeFilter(val, type) {
    if (val.type === type) return true;
    else return false;
  }

  const handleAddContactButton = (id) => {
    const contact = {
      id: 0,
      type: 0,
      value: "",
      userId: id,
    }
    setContact(contact)
    setNewContact(true)
  }

  const editUserButton = (row) => {
    setUser({...row})
    setNewUser(true);
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 0)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 1)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 2)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => editUserButton(row)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding="20px 30px 20px 30px">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Button
                        variant="text"
                        color="info"
                        startIcon={<AddIcon />}
                        onClick={(event) => handleAddContactButton(row.id)}
                      >
                        Novo Contato
                      </Button>
                    </TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Deletar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.contacts
                    .sort((a, b) => a.type - b.type)
                    .map((row) => (
                      <CollapsibleTableRow
                        key={row.value}
                        value={row}
                        methods={{ deleteContact }}
                        open={{ open: newContact, setOpen: setNewContact }}
                        contact={{ contact, setContact }}
                      ></CollapsibleTableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ContactForm
        open={{ open: newContact, setOpen: setNewContact }}
        contact={{ contact, setContact }}
        methods={{ addOrEditContact }}
      ></ContactForm>
    </>
  );
}
