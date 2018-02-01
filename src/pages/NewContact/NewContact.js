import React, { Component } from 'react';
import ax from '../../config/axios';




class NewContact extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                organization: '',
                email: '',
                phone: '',
                address: '',
            },
            options: ['Personal', 'Mobile', 'Home'],
            emails: [],
            required: ['first_name', 'last_name']


        }
        this.submitForm = this.submitForm.bind(this)
        this.handleInput = this.handleInput.bind(this)

    }

    handleInput(evt) {
        const name = evt.target.name
        const value = evt.target.value
        let temp = Object.assign({}, this.state.user);
        temp[name] = value;
        this.setState({user: temp})
        }


    submitForm() {

        console.log(this.state)
        const payload = {
            user: this.state.user
        }
        ax.post('/users', payload).then(res =>  this.props.history.push('/'))

    }
    render() {
        const defaultOption = this.state.options[0]
        return (

            <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Add New Conact</h5>
                        </div>
                    <div className="ibox-content">
                            <form method="get" className="form-horizontal" id="newConactForm">
                                <div className="form-group"><label className="col-sm-2 control-label">First Name</label>
                                    <div className="col-sm-10"><input
                                    type="text" className="form-control"
                                    placeholder="First Name" name="first_name"
                                    value={this.state.user.first_name} onChange={this.handleInput} /></div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group"><label className="col-sm-2 control-label" >Last Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control"
                                    placeholder="Last Name" name="last_name"
                                    value={this.state.user.last_name} onChange={this.handleInput}/></div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group"><label className="col-sm-2 control-label">Organization</label>
                                    <div className="col-sm-10">
                                    <input type="text" placeholder="placeholder"
                                    className="form-control" name="organization"
                                    value={this.state.user.organization} onChange={this.handleInput}/></div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group"><label className="col-sm-2 control-label">Bio</label>
                                    <div className="col-sm-10"><textarea className="form-control" name='bio'
                                    value={this.state.user.bio} onChange={this.handleInput}></textarea></div>
                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Phone</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" name="phone"
                                        value={this.state.user.phone} onChange={this.handleInput} />
                                    </div>

                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control"
                                         name="email" value={this.state.user.email} onChange={this.handleInput} />
                                    </div>

                                </div>
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-2">
                                        <button className="btn btn-white" type="submit">Cancel</button>
                                        <button className="btn btn-primary" type="button" onClick={this.submitForm}>Save changes</button>
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>
        )
    }
}

export default NewContact