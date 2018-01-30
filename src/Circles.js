import React, { Component } from 'react';


class Circles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: this.props.contacts,
            circleList: []
        }

    }

    componentDidMount() {
        let item = []
        let circleList = this.state.contacts.map((contact) => {
            if (contact.circles.length > 0) {
               let items = contact.circles.map((circle) => {
                   console.log(circle)
                    let name  = circle.name;
                    let count = 1
                    if (item[circle.name]) {
                        item[circle.name] += 1
                    } else {
                        item[circle.name] = 1
                    }
                    return {name, count}
                })
            }
        })
        console.log(typeof item)
        this.setState({ circleList: item })
    }
    render() {
        console.log('This is the list: ', this.state.circleList)
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
                    {Object.keys(this.state.circleList).forEach( (item) => {
                            return <li> {item} </li>
                    })}
                </div>
            </div>

        )
    }
}

export default Circles;