import React, { Component } from 'react';
import mockContacts from '../../data/mock_contact_data';
import EventItem from '../../Components/EventItem'
import ax from '../../config/axios';
import detail from './Detail.css'

let Modal = require('react-bootstrap-modal')


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactId: props.match.params.number,
            contact: '',
            message: 'Test Message',
            events: [],
            isModelOpen: false,
            actionType: '',
            sendTo: ''

        }

        this.makeAction = this.makeAction.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
        this.Delete = this.Delete.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    componentDidMount() {
        const payload = {
            params: {
                limit: 15
            }
        }
        ax.get(`/users/${this.props.match.params.number}`, payload )
        .then(res => {
            console.log(res.data)
            this.setState({contact: res.data})
        })

    }

    deleteItem(style, id) {
        console.log(style, id)
        const stylePlural = [style + 's'][0]
        console.log(style, id, stylePlural)

        ax.delete(`/users/${this.props.match.params.number}/${style}/${id}`).then((res) => {
            const newList = this.state.contact.contact[stylePlural].filter( phone => phone.id !== id)
            const TempContact = Object.assign({}, this.state.contact)
            TempContact.contact[stylePlural] = newList
            this.setState({contact: TempContact})
        })

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

    updateMessage(evt){
        const message = evt.target.value
        this.setState({message})

    }
    makeAction(type) {
        this.setState({isModelOpen: true, actionType: type})
        //this.addEvent(type, this.state.message)
    }

    Delete() {
        console.log("Making a Call")
    }
    render() {
        let phoneList, emailList = 'No Information Availabile'
        if(this.state.contact.contact && this.state.contact.contact.phones.length > 0) {
            phoneList  = this.state.contact.contact.phones.map( (phone, idx) => {
            return <li key={phone.id}>{phone.number} <i className="fa fa-minus" onClick={ () => this.deleteItem('phone', phone.id)}></i></li>
            })
        }
        if (this.state.contact.contact && this.state.contact.contact.emails.length > 0) {
            emailList  = this.state.contact.contact.emails.map( (email, idx) =>{
                    return <li key={email.id}>{email.email} <i className="fa fa-minus"  onClick={ () => this.deleteItem('email', email.id)}></i></li>
        })
        }
        return (
        <div className="row animated fadeInRight">
                <div className="col-md-4">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Profile Detail</h5>
                        </div>
                        <div>
                            <div className="ibox-content">
                                <h4><strong>{this.state.contact.first_name} {this.state.contact.last_name}</strong></h4>
                                <p><i className="fa fa-map-marker"></i> {this.state.contact.organization}</p>
                                <h5>
                                    About me
                                </h5>
                                <p>
                                    {this.state.contact.bio}
                                </p>
                                <div className="user-button">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.makeAction}><i className="fa fa-envelope"></i>Text</button>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-default btn-sm btn-block" onClick={this.makeAction}><i className="fa fa-coffee"></i>Call</button>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-default btn-sm btn-block" onClick={this.makeAction}><i className="fa fa-coffee"></i>Email</button>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-default btn-sm btn-block" onClick={this.makeDelete}><i className="fa fa-coffee"></i>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                    </div>
                <div className="col-md-8">
                <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Details</h5>
                        </div>
                        <div className="ibox-content">
                        <p>Phones <i className="fa fa-plus" onClick={this.addNumber}></i></p>
                        {phoneList}
                        <p>Emails <i className="fa fa-plus"  onClick={this.addNumber}></i> </p>
                        {emailList}
                        </div>
                </div>

                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Activites</h5>
                        </div>
                        <div className="ibox-content">

                            <div>
                                <div id="vertical-timeline" className="vertical-container light-timeline no-margins">
                                        {this.state.events.map((item, i) => <EventItem item={item} key={i} />)}

                                </div>
                                </div>


                    </div>

                </div>
            </div>
            </div>

        )}
}


export default Detail