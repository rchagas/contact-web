import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/AddCircleOutline";

import {
  Button,
  Collapse,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/system/Box";
import { width } from "@mui/system";

function ContactTypeFilter(val, type) {
  if (val.type === type) return true;
  else return false;
}

const ContactType = ["Telefone", "Email", "Whatsapp"];

function NewContactRow(props) {

  const [type, setType] = useState(0);

  const [editContact, setEditContact] = useState({
    id: 0,
    type: 0,
    value: "",
    userId: 0,
  });
  
  const handleChange = async e => {
    editContact[e.target.name] = e.target.value;
    setEditContact(editContact);
  }

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <TextField
            id="ContactType"
            name="type"
            select
            label="Tipo"
            type="number"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}
            style={{width: '150px'}}
          >
            {ContactType.map((option, index) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
        <TableCell align="left">
          <TextField id="ContactType" label="Contact" variant="standard" />
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell>
          <Button variant="text" color="inherit">
            Salvar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

function CollapsibleTableRow(props) {
  const { deleteContact } = props.value;
  const { row } = props.value;

  return (
    <>
      <TableRow>
        <TableCell align="left">{ContactType[row.type]}</TableCell>
        <TableCell align="left">{row.value}</TableCell>
        <TableCell align="left">
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="left">
          <IconButton onClick={() => deleteContact(row)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <Button variant="text" color="inherit">
            Salvar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

function EditCell(row, cell) {}

export default function ContactRow(props) {
  const { deleteUser } = props.value;
  const { deleteContact } = props.value;
  const { row } = props.value;

  const [open, setOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState([]);

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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">
          {row.contacts.filter((val) => ContactTypeFilter(val, 0)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell align="left">
          {row.contacts.filter((val) => ContactTypeFilter(val, 1)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell align="left">
          {row.contacts.filter((val) => ContactTypeFilter(val, 2)).shift()
            ?.value || <HorizontalRuleIcon />}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">Editar</TableCell>
                    <TableCell align="left">Deletar</TableCell>
                    <TableCell>
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.contacts
                    .sort((a, b) => a.type - b.type)
                    .map((row) => (
                      <CollapsibleTableRow
                        key={row.value}
                        value={{ row, deleteContact }}
                      ></CollapsibleTableRow>
                    ))}
                  <NewContactRow></NewContactRow>
                </TableBody>
              </Table>
              <Typography align="right"></Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
