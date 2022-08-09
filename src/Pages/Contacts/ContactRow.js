import IconButton from "@mui/material/IconButton";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ContactForm from "./ContactForm";

import { Button, Collapse, styled, Table, TableBody, TableHead } from "@mui/material";
import Box from "@mui/system/Box";
import CollapsibleTableRow from "./CollapsibleTableRow";

export default function ContactRow(props) {
  const { addOrEditContact, deleteUser, deleteContact } = props.methods;
  const row = props.value;
  
  const [open, setOpen] = React.useState(false);
  const [newContact, setNewContact] = React.useState(false);

  const { user, setUser } = props.user;
  const { setNewUser } = props.newUserButton;
  const { contact, setContact } = props.contact;
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function ContactTypeFilter(val, type) {
    if (val.type === type) return true;
    else return false;
  }

  const handleAddContactButton = (id) => {
    setContact({
      id: 0,
      type: 0,
      value: "",
      userId: id,
    })
    setNewContact(true)
  }

  const editUserButton = (row) => {
    contact.userId = row.id;
    setContact({
      id: 0,
      type: 0,
      value: "",
      userId: row.id
    })
    setUser({...row})
    setNewUser(true);
  }

  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center" component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 0)).shift()
            ?.value || <HorizontalRuleIcon />}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 1)).shift()
            ?.value || <HorizontalRuleIcon />}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.contacts.filter((val) => ContactTypeFilter(val, 2)).shift()
            ?.value || <HorizontalRuleIcon />}
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton onClick={() => editUserButton(row)}>
            <EditIcon />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton onClick={() => deleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding="20px 30px 20px 30px">
              <Table size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">
                      <Button
                        variant="text"
                        startIcon={<AddIcon />}
                        onClick={(event) => handleAddContactButton(row.id)}
                        sx={{color: 'white'}}
                      >
                        Novo Contato
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="center">Editar</StyledTableCell>
                    <StyledTableCell align="center">Deletar</StyledTableCell>
                  </StyledTableRow>
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
        </StyledTableCell>
      </StyledTableRow>
      <ContactForm
        open={{ open: newContact, setOpen: setNewContact }}
        contact={{ contact, setContact }}
        user={{ user, setUser }}
        methods={{ addOrEditContact }}
      ></ContactForm>
    </>
  );
}
