import React, { Component } from 'react';


class EventItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item

        }

        this.getIcon = this.getIcon.bind(this)
    }
    getIcon(style) {
        let icon = ''
        switch (style) {
            case 'text':
            icon = 'fa fa-mobile'

                break;
            case 'call':
            icon = 'fa fa-phone'

                break;

            case 'email':
            icon = 'fa fa-envelope'

                break;
            default:
                break;
        }

        return icon;

    }
    render() {
        return (
            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon navy-bg">
                    <i className={this.getIcon(this.state.item.event)}></i>
                </div>

                <div className="vertical-timeline-content">
                    <h2>{this.state.item.event}</h2>
                    <p>{this.state.item.message}    </p>
                    <span className="vertical-date">
                        {this.state.item.timestamp}
                        <small>Dec 24</small>
                    </span>
                </div>
            </div>

        )
    }
}

export default EventItem