import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/ContactList/ContactList';
import { AddForm } from 'components/Form/Form';
import { Container } from './Container/Container';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = values => {
    const hasContact = this.state.contacts.find(
      contact => values.name === contact.name
    );

    if (hasContact) {
      alert(`${values.name} is already in contacts`);

      return;
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...values,
      };

      return { contacts: [newContact, ...contacts] };
    });
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.filteredContacts();
    const { filter } = this.state;

    return (
      <Container titleText="Phonebook">
        <Section>
          <AddForm onSubmit={this.handleSubmit} />
        </Section>
        <Section sectionTitle="Contacts">
          <Filter
            filterTitle="Find contacts by name"
            filterValue={filter}
            onFilter={this.handleFilter}
          />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.handleDelete}
          />
        </Section>
      </Container>
    );
  }
}
