import React from 'react'
import PropTypes from 'prop-types'; // ES6

class NotificationItem extends React.PureComponent {
  render() {
    if (this.props.value) return (<li data-notification-type={this.props.type} onClick={() => { this.props.markAsRead(this.props.id) }}>{this.props.value}</li>);
    else return (<li data-notification-type={this.props.type} dangerouslySetInnerHTML={this.props.html} onClick={() => { this.props.markAsRead(this.props.id) }}></li>);
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func
}

NotificationItem.defaultProps = {
  type: 'default',
  value: '',
  html: {},
  markAsRead: () => void(0)
}

export default NotificationItem;
