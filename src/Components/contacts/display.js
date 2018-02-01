import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ContactsDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orignalContacts: this.props.contacts,
            filteredContacts:[],
            searchTerm: ''
        }
        this.doSearch = this.doSearch.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        //console.log("here are the props ",nextProps)
        this.state.filteredContacts = nextProps.contacts
        this.state.orignalContacts = nextProps.contacts
    }

    doSearch(evt) {
        let searchedContacts = this.state.orignalContacts;
        const searchTerm = evt.target.value;
        if(searchTerm.length > 0)
        {
            searchedContacts = this.state.orignalContacts.filter( (contact) => (contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.last_name.toLowerCase().includes(searchTerm.toLowerCase())) )
        }
        //console.log(searchedContacts)
        this.setState({filteredContacts: searchedContacts, searchTerm: searchTerm})

    }
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
                <div className="row m-b-sm m-t-sm">
                  <div className="col-md-11">
                    <div className="input-group"> <input type="text" placeholder="Search" value={this.state.searchTerm} onChange={this.doSearch} />
                    </div>
                </div>
            </div>


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
                                {this.state.filteredContacts.map(function (contact, idx) {
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