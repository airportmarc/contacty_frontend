import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ContactsDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orignalContacts: this.props.contacts,
            filteredContacts: this.props.contacts,
            serarchTerm: ''
        }
        this.doSearch = this.doSearch.bind(this)
    }

    doSearch(evt) {
        let searchedContacts = this.state.orignalContacts;
        const searchTerm = evt.target.value;
        if(searchTerm.length > 0)
        {
            searchedContacts = this.state.orignalContacts.filter( (contact) => contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.last_name.includes(searchTerm.toLowerCase()) )
        }
        this.setState({filteredContacts: searchedContacts})

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
                    <div className="row">
                        <div className="col-sm-9 m-b-xs">
                            <div data-toggle="buttons" className="btn-group">
                                <label className="btn btn-sm btn-white"> <input type="radio" id="option1" name="options" /> Day </label>
                                <label className="btn btn-sm btn-white active"> <input type="radio" id="option2" name="options" /> Week </label>
                                <label className="btn btn-sm btn-white"> <input type="radio" id="option3" name="options" /> Month </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group">
                            <input onKeyUp={ (evt) => this.doSearch(evt)}
                                   value={this.state.searchTerm}
                             type="text"
                             placeholder="Search"
                             className="input-sm form-control"  /></div>
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
                                    <th>Country </th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filteredContacts.map(function (contact, idx) {
                                    return (

                                        <tr key={idx}>

                                            <td><Link to={`/detail/${contact.pk}`}>{contact.first_name} </Link></td>
                                            <td>{contact.last_name}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.country}</td>
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