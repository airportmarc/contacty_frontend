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
        let temp = []
        temp = mockContacts.filter((item) => {
            if (item.pk == props.match.params.number) {
                return true
            }
            return false
        })
        this.state.contact = temp[0]

        this.makeAction = this.makeAction.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
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

        let closeModel = () => this.setState({isModelOpen: false})

        let sendAndClose = () => {
            const payload = {
                actionType: this.state.actionType,
                sendTo: this.state.sendTo,
                message: this.state.message
            }
            ax.post('/makeAction', payload)
            .then( ()=> this.setState({isModelOpen: false}))
        }
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
                    <div className="row">
                            <div className="col-xs-3">
                                <button className="btn btn-lg btn-primary action-buttons" onClick={this.makeAction}><i className="fa fa-phone"></i></button>
                            </div>
                            <div className="col-xs-3">
                                <button className="btn btn-lg btn-primary action-buttons" onClick={this.makeAction}><i className="fa fa-mobile"></i></button>
                            </div>
                        </div>
                    <div className="row">
                            <div className="col-xs-3">
                                <button className="btn btn-lg btn-primary action-buttons" onClick={this.makeEmail}><i className="fa fa-envelope"></i></button>
                            </div>
                            <div className="col-xs-3">
                                <button className="btn btn-lg btn-warn action-buttons" onClick={this.makeDelete}> <i className="fa fa-close"></i></button>
                            </div>
                    </div>
                </div>


                </div>
                <div className="row">

                    <div className="col-lg-3">

                        <div className="ibox">
                            <div className="ibox-content">
                                <h3>About {this.state.contact.first_name} {this.state.contact.last_name} </h3>

                                <p className="small">
                                   {this.state.contact.bio}
                </p>


                            </div>
                        </div>



                    </div>

                    <div className="col-lg-5">

                    </div>
                    <div className="col-lg-4 m-b-lg">
                        <div id="vertical-timeline" className="vertical-container light-timeline no-margins">
                            {this.state.events.map((item, i) => <EventItem item={item} key={i} />)}

                        </div>
                    </div>
                </div>
                <Modal
          show={this.state.isModelOpen}
          onHide={closeModel}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Send a message</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <textarea value={this.state.message}  onChange={this.updateMessage}></textarea>
          </Modal.Body>
          <Modal.Footer>

            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            <button className='btn btn-primary' onClick={sendAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>


            </div>
        )
    }
}

export default Detail