import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';  

const ContactList = ({ contacts, onContactSelect, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id} button onClick={() => onContactSelect(contact)}>
          <ListItemText primary={contact.name} secondary={contact.email} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onDelete(contact.id)}>
              <DeleteIcon style={{fill:"red"}} />  
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
