import React, { Component } from 'react';
import ax from '../../config/axios'

import Circles from '../../Components/Circles';
//import mockContacts from '../../data/mock_contact_data';
import Contacts from '../../Components/contacts/display';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCircleOpen: false,
            contactsClass: 'col-md-12',
            contacts: [],
        }
        //this.toggleCircle = this.toggleCircle.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        const payload = {
            params: {
                limit: 15
            }
        }
        ax.get('/users', payload )
        .then(res => {
            console.log(res.data)
            this.setState({contacts: res.data})
        })

    }

    // toggleCircle() {
    //     this.setState({ isCircleOpen: !this.state.isCircleOpen }, () => {
    //         //adding a call back to ensure state has been changed.
    //         { this.state.isCircleOpen ? this.setState({ contactsClass: 'col-md-8' }) : this.setState({ contactsClass: 'col-md-12' }) }
    //     })
    // }
    render() {
        return (
            <div>
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