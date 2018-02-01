import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ContactsDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orignalContacts: this.props.contacts,
            filteredContacts: this.props.contacts,
            searchTerm: ''
        }
        //this.doSearch = this.doSearch.bind(this)
    }

    componentWillUpdate(nextProps, nextState) {
        this.state.contacts = nextProps.contacts
        nextState.orignalContacts = nextState.contacts
        //nextState.filteredContacts = nextState.contacts
    }
    // doSearch(evt) {
    //     let searchedContacts = this.state.orignalContacts;
    //     const searchTerm = evt.target.value;
    //     if(searchTerm.length > 0)
    //     {
    //         searchedContacts = this.state.orignalContacts.filter( (contact) => contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.last_name.includes(searchTerm.toLowerCase()) )
    //     }
    //     console.log(searchedContacts)
    //     this.setState({orignalContacts: searchedContacts})

    // }
    render() {
        return (
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>Contacts </h5>
                    <div className="ibox-tools">

                        <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div className="ibox-content">

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>

                                    <th>First Name</th>
                                    <th>Last Name </th>
                                    <th>Phone</th>
                                    <th>Email </th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orignalContacts.map(function (contact, idx) {
                                    return (

                                        <tr key={idx}>

                                            <td><Link to={`/detail/${contact.id}`}>{contact.first_name} </Link></td>
                                            <td>{contact.last_name}</td>
                                            <td>{ contact.contact ? contact.contact.phones[0].number : '-' }</td>
                                            <td>{contact.email}</td>
                                        </tr>

                                )})}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        )
    }
}

export default ContactsDisplay;