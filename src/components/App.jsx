import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import contactsJson from '../assets/contacts.json';

import styles from './App.module.css';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter} from './Filter/Filter';




export class App extends Component{


  state = {
    contacts: [],
    filter: '',
  };


    componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || contactsJson;
    this.setState({ contacts });
  }


   componentDidUpdate(_, prevState) {
    if (
      prevState.contacts.length !== 0 &&
      prevState.contacts.length !== this.state.contacts.length
    ) {

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

   }
  
  addContact = ({ name, number }) => {
    const Contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === Contact.name.toLowerCase()
      )
    ) {
      return alert(`${Contact.name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [Contact, ...prevState.contacts],
    }));
  };

  handleDelete = id => {
      this.setState(prevState => {
      const newContactsList = prevState.contacts.filter(contact => contact.id !== id);

      return { contacts: newContactsList };
    });
  }

  handleUpdateSearch = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
    
  };
  
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  
  
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();


    return (
    <div className={styles.container} >
      <h1>Phonebook</h1>
      <ContactForm onContact={this.addContact}/>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.handleUpdateSearch} />
      <ContactList contacts={visibleContacts} onDelete={this.handleDelete} /> 
    </div>
  );
  }
  
};
