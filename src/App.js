import React, { Component } from 'react';
import './css/bootstrap.css';
import './css/App.css';
import './css/site.css';
import Contacts from './contacts/display';
import TopNav from './Nav';
import Circles from './Circles';
import mockContacts from './data/mock_contact_data';

require('./font-awesome/css/font-awesome.min.css');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCircleOpen: false,
      contactsClass: 'col-md-12',
      contacts: mockContacts
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
      <div id="wrapper">
        <div id="page-wrapper" className="gray-bg">
          <TopNav />
          <div className="wrapper wrapper-content">
            <div className="container">
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
                {this.state.isCircleOpen ? <div className="col-md-4"> <Circles /> </div> : ''}
              </div>
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
