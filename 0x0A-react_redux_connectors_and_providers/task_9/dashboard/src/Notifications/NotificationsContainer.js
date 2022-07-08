import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'; // ES6

import { fetchNotifications, markAsAread, setNotificationFilter } from "../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../selectors/notificationSelector";
import Notifications from "./Notifications";

export class NotificationsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    return <Notifications {...this.props}></Notifications>;
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: null,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {},
};

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotificationsByType(state),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
