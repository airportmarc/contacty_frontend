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
            sendTo: '',
            isAddItemOpen: false,
            addItemStyle: '',

        }

        this.makeAction = this.makeAction.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.Delete = this.Delete.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.openAddItem = this.openAddItem.bind(this)
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

    openAddItem(style) {

        this.setState({isAddItemOpen: true, addItemStyle: style})

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

    updateInput(evt){
        const value = evt.target.value
        this.setState({message: value})
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

        let closeModal = () => this.setState({ isModelOpen: false, isAddItemOpen: false, message: '' })

        let saveAndCloseAdditem = () => {
            let payload = {}
            if (this.state.addItemStyle == 'email') {
                payload = {
                    email: this.state.message
                }
            } else {
                payload = {
                    number: this.state.message
                }
            }

            ax.post(`/users/${this.props.match.params.number}/${this.state.addItemStyle}`, payload)
            .then(res => {
                const stylePlural = [this.state.addItemStyle + 's'][0]
                const TempContact = Object.assign({}, this.state.contact)
                TempContact.contact[stylePlural].push(res.data)
                this.setState({contact: TempContact, messsage: '', isAddItemOpen: false})
            })
        }

        let saveAndCloseMakeAction = () => {
            const payload = {
                message: this.state.message,
                style: this.state.style,
                sendTo: this.state.sendTo
            }

            ax.post('/makeAction', payload)
            .then(res => {
                this.setState({isModelOpen: false})
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
                        <p>Phones <i className="fa fa-plus" onClick={() => this.openAddItem('phone')}></i></p>
                        {phoneList}
                        <p>Emails <i className="fa fa-plus"  onClick={() => this.openAddItem('email')}></i> </p>
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
            <div>

        <Modal
          show={this.state.isModelOpen}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Send a message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textaera onChange={this.updateInput} value={this.state.message}></textaera>
          </Modal.Body>
          <Modal.Footer>

            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            <button className='btn btn-primary' onClick={saveAndCloseMakeAction}>
              Save
            </button>
          </Modal.Footer>
        </Modal>

        <div>

        <Modal
          show={this.state.isAddItemOpen}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Add a new Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" name="addItemValue" value={this.state.message} onChange={this.updateInput} />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
            <button className='btn btn-primary' onClick={saveAndCloseAdditem}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
            </div>

        )}
}


export default Detail