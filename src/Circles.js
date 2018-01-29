import React, { Component } from 'react';


class Circles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            circles: this.props.circles
        }
    }

    newCircle() {
        console.log('Adding a new Circle')
    }
    render() {
        return (
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>Contacts </h5>
                    <div className="ibox-tools">
                        <button className="btn btn-primary" onClick={this.newCircle}> New Circle</button>
                        <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div className="ibox-content">
                <p>Circle</p>
                </div>
            </div>

        )
    }
}

export default Circles;