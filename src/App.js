import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from "./components/ListContact";
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {

  state = {
    contacts: [] , 
  }
  
  componentDidMount () {
    ContactsAPI.getAll().then( contacts => {
        this.setState( () => ({
            contacts 
        }))
    })
  }

  createContact = ( contact ) => {
      ContactsAPI.create( contact ).then( contact => {
        this.setState( (prevState) => ({
            contacts : prevState.contacts.concat([contact])
        }))
      })

  }

  removeContact = ( contact ) => {

    this.setState( (currentState) => ({
        contacts: currentState.contacts.filter( c => {
          return c.id !== contact.id;
        })

    }) );

    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>  
          <Route exact path='/' render={ () => (
              <ListContacts 
                  contacts={this.state.contacts} 
                  remove={this.removeContact} 
              />
          )} />
        
          <Route exact path='/create' render={ ( {history} ) => (
              <CreateContact onCreateContact={ (contact) => {
                this.createContact(contact) 
                history.push('/')
              }} /> 
          )} />

      </div>
      
    );
  }
}

export default App;
