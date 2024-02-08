import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const ContactForm = ({ selectedContact, onAdd, onEdit }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [selectedContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', 
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '' };
  
    if (contact.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    }
  
    if (contact.email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!isValidEmail(contact.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
  
    if (contact.phone.trim() === '') {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else if (contact.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (selectedContact) {
        onEdit(contact);
      } else {
        onAdd(contact);
      }

      setContact({
        name: '',
        email: '',
        phone: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-main-container'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {selectedContact ? 'Edit Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
