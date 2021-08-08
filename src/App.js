import React, { Component } from 'react';
import ListContacts from "./components/ListContact";
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts: []
  }
  
  componentDidMount () {
    ContactsAPI.getAll().then( contacts => {
        console.log( contacts );
        this.setState( () => ({
            contacts
        }))
    })
  }

  removeContact = ( contact ) => {
    this.setState( (currentState) => ({
        Contacts: currentState.Contacts.filter( c => {
          return c.id !== contact.id;
        })

    }) );

  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} remove={this.removeContact} />
      </div>
      
    );
  }
}

export default App;
