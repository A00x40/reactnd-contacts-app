import React , { useState } from 'react';
import PropTypes from 'prop-types';

export default function ListContacts (props)  {

    const [state, setstate] = useState({
        query:''
    });

    const handleChange = (e) => {
        setstate({
            query : e.target.value.trim()
        });
    }

    const handleReset = () => {
        setstate({
            query : ''
        });
    }

    const { contacts , remove } = props;
    
    const showingContacts = ( state.query === '' ) 
    ? contacts : 
    contacts.filter( (c) => (
        c.name.toLowerCase().startsWith( state.query.toLowerCase())
    ));

    return (
        
        <div className='list-contacts'>

            <div className='list-contacts-top'>
                <input 
                className='search-contacts'
                type='text'
                placeholder='Search Contacts'
                value={state.query}
                onChange={(e) => handleChange(e)}
                />
            </div>

            {
                contacts.length !== showingContacts.length &&
                <div className='showing-contacts'>
                    <span> Now Showing {showingContacts.length} of {contacts.length} </span>
                    <button onClick={() => {handleReset()}}>Show all</button>

                </div>
            }

            <ol className = "contact-list">
                { 
                    showingContacts.map( contact => (
                        <li key = {contact.id} className = "contact-list-item">             
                            <div 
                                className = "contact-avatar"
                                style = {{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                            ></div>
                            <div className = "contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className = "contact-remove" onClick={ () => remove(contact)}></button>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}

ListContacts.propTypes = {
    contacts : PropTypes.array ,
    remove : PropTypes.func
}
