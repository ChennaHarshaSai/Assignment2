import React, { useState, useEffect } from "react";
import {  AppBar, Typography, Toolbar } from "@mui/material";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import axios from "axios";
import "../src/Components/general.css"

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleContactAdd = (newContact) => {
    axios
      .post(API_URL, newContact)
      .then((response) => setContacts([...contacts, response.data]))
      .catch((error) => console.error("Error adding contact:", error));
  };

  const handleContactEdit = (editedContact) => {
    axios
      .put(`${API_URL}/${editedContact.id}`, editedContact)
      .then((response) => {
        const updatedContacts = contacts.map((contact) =>
          contact.id === editedContact.id ? response.data : contact
        );
        setContacts(updatedContacts);
      })
      .catch((error) => console.error("Error editing contact:", error));
  };

  const handleContactDelete = (contactId) => {
    axios
      .delete(`${API_URL}/${contactId}`)
      .then(() => {
        const updatedContacts = contacts.filter(
          (contact) => contact.id !== contactId
        );
        setContacts(updatedContacts);
        setSelectedContact(null);
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Contacts Management App</Typography>
        </Toolbar>
      </AppBar>
        <div className="app-main-container">
          <ContactList
            contacts={contacts}
            onContactSelect={handleContactSelect}
            onDelete={handleContactDelete}
          />
          <ContactForm
            selectedContact={selectedContact}
            onAdd={handleContactAdd}
            onEdit={handleContactEdit}
          />
        </div>
    </div>
  );
}

export default App;
