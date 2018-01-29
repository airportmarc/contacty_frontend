import React, { Component } from 'react';

class ContactsDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: this.props.contacts
        }
    }
    handleCicles() {
        console.log('Circle open/close');
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
                            <div className="input-group"><input type="text" placeholder="Search" className="input-sm form-control" /> <span className="input-group-btn">
                                <button type="button" className="btn btn-sm btn-primary"> Go!</button> </span></div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>

                                    <th>#</th>
                                    <th>Project </th>
                                    <th>Name </th>
                                    <th>Phone </th>
                                    <th>Company </th>
                                    <th>Completed </th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Project <small>This is example of project</small></td>
                                    <td>Patrick Smith</td>
                                    <td>0800 051213</td>
                                    <td>Inceptos Hymenaeos Ltd</td>
                                    <td><span className="pie">0.52/1.561</span></td>
                                    <td>20%</td>
                                    <td>Jul 14, 2013</td>
                                    <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        )
    }
}

export default ContactsDisplay;