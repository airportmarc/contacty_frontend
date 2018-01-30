import React, { Component } from 'react';
import mockContacts from '../../data/mock_contact_data';
import EventItem from '../../Components/EventItem'
import ax from '../../config/axios';
import detail from './Detail.css'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactId: props.match.params.number,
            contact: '',
            message: 'Test Message',
            events: []

        }
        let temp = []
        temp = mockContacts.filter((item) => {
            if (item.pk == props.match.params.number) {
                return true
            }
            return false
        })
        this.state.contact = temp[0]

        this.makeCall = this.makeCall.bind(this)
        this.makeText = this.makeText.bind(this)
        this.makeEmail = this.makeEmail.bind(this)
        this.Delete = this.Delete.bind(this)
        this.addEvent = this.addEvent.bind(this)
    }
    addEvent(eventType, message) {
        let currentEvent = this.state.events.slice()
        const item = {
            event: eventType,
            message,
            timestamp: new Date().toDateString()
        }
        currentEvent.push(item)
        this.setState({ events: currentEvent })
    }
    makeCall() {
        console.log("Making a Call")
        const payload = {
            sendto: this.state.contact.phone,
            message: this.state.message
        }
        this.addEvent('call', this.state.message)
        console.log(payload)
        //console.log(ax.post('/1njy43x1', payload ))
    }
    makeText() {
        console.log("Making a Call")
        this.addEvent('text', this.state.message)
    }
    makeEmail() {
        console.log("Making a Call")
        this.addEvent('email', this.state.message)
    }
    Delete() {
        console.log("Making a Call")
    }
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row m-b-lg m-t-lg">
                    <div className="col-md-6">
                        <div className="profile-image">
                        </div>
                        <div className="profile-info">
                            <div className="">
                                <div>
                                    <h2 className="no-margins">
                                        {this.state.contact.first_name} {this.state.contact.last_name}
                                    </h2>
                                    <h4>Founder of Groupeq</h4>
                                    <small>
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                        have suffered alteration in some form Ipsum available.
                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <table className="table small m-b-xs">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>{this.state.contact.street}</strong>
                                    </td>
                                    <td>
                                        <strong>{this.state.contact.city}</strong>
                </td>

                                </tr>
                                <tr>
                                    <td>
                                        <strong>{this.state.contact.country}</strong> Comments
                </td>
                                    <td>
                                        <strong>54</strong> Articles
                </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>154</strong> Tags
                </td>
                                    <td>
                                        <strong>32</strong> Friends
                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>
                <div className="row">

                    <div className="col-lg-3">

                        <div className="ibox">
                            <div className="ibox-content">
                                <h3>About Alex Smith</h3>

                                <p className="small">
                                    There are many variations of passages of Lorem Ipsum available, but the majority have
                    suffered alteration in some form, by injected humour, or randomised words which don't.
                                                       If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing
                </p>

                                <p className="small font-bold">
                                    <span><i className="fa fa-circle text-navy"></i> Online status</span>
                                </p>

                            </div>
                        </div>



                    </div>

                    <div className="col-lg-5">
                        <div className="row">
                            <div className="col-md-6">
                                <div class="widget navy-bg p-lg text-center" onClick={this.makeCall}>
                                    <div class="m-b-md">
                                        <i class="fa fa-phone fa-4x"></i>
                                        <h4 class="font-bold no-margins">
                                            {this.state.contact.phone}
                                        </h4>
                                        <small>Call</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="widget navy-bg p-lg text-center" onClick={this.makeText}>
                                    <div class="m-b-md">
                                        <i class="fa fa-mobile fa-4x"></i>
                                        <h4 class="font-bold no-margins">
                                            {this.state.contact.phone}
                                        </h4>
                                        <small>Text</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="widget navy-bg p-lg text-center" onClick={this.makeEmail}>
                                    <div class="m-b-md">
                                        <i class="fa fa-phone fa-4x"></i>
                                        <h6 class="font-bold no-margins">
                                            {this.state.contact.email}
                                        </h6>
                                        <small>Email</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="widget navy-bg p-lg text-center" onClick={this.makeDelete}>
                                    <div class="m-b-md">
                                        <i class="fa fa-close fa-4x"></i>
                                        <h4 class="font-bold no-margins">
                                            Delete
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 m-b-lg">
                        <div id="vertical-timeline" className="vertical-container light-timeline no-margins">
                            {this.state.events.map((item, i) => <EventItem item={item} key={i} />)}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail