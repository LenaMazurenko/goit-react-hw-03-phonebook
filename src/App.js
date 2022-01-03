import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Wrapper } from './components/Section';
import FormContacts from './components/FormContacts';
import { Filter } from './components/Filter';
import ContactsList from './components/ContactsList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //===============================
  formSubmitHundler = ({ name, number }) => {
    const idList = nanoid();

    const { contacts } = this.state;
    if (contacts.find(item => item.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: idList,
            name,
            number,
          },
        ],
      }));
    }
  };

  filterHundler = ev => {
    this.setState({ filter: ev.target.value });
  };

  findeContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deletHundler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const findesContacts = this.findeContact();

    return (
      <Wrapper>
        <h1>Phonebook </h1>
        <FormContacts onSubmitProp={this.formSubmitHundler} />
        <h2>Contacts</h2>

        <Filter findeName={this.state.filter} onFind={this.filterHundler} />

        <ContactsList
          findeContact={findesContacts}
          onDelet={this.deletHundler}
        />
      </Wrapper>
    );
  }
}
export default App;
