import React, { Component } from 'react';

import Circles from './Circles';
import mockContacts from './data/mock_contact_data';
import Contacts from './contacts/display';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCircleOpen: false,
            contactsClass: 'col-md-12',
            contacts: mockContacts,
        }
        this.toggleCircle = this.toggleCircle.bind(this)
    }

    toggleCircle() {
        this.setState({ isCircleOpen: !this.state.isCircleOpen }, () => {
            //adding a call back to ensure state has been changed.
            { this.state.isCircleOpen ? this.setState({ contactsClass: 'col-md-8' }) : this.setState({ contactsClass: 'col-md-12' }) }
        })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="ibox">
                        <div className="ibox-content">
                            <button className="btn btn-white" onClick={this.toggleCircle}> Toggle Circles</button>
                            <button className="btn btn-white" onClick={this.addNew}> Add New Contact</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className={this.state.contactsClass}>
                        <Contacts contacts={this.state.contacts} />
                    </div>
                    {this.state.isCircleOpen ? <div className="col-md-4"> <Circles contacts={this.state.contacts} /> </div> : ''}
                </div>
            </div>
        )
    }
}

export default Dashboard;