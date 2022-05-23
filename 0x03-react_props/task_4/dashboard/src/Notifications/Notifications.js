import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types'; // ES6


const Notifications = ({ displayDrawer }) => {
  const btnStyle = {
    top: '1em',
    right: '1em',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  };

  const imgStyle = {
    width: '20px',
    height: '20px',
  }

  return (
    <div className="notification-container">
      <div className="menuItem">Your notifications</div>
      { displayDrawer ?
        (<div className="Notifications">
          <button style={btnStyle} aria-label='Close' onClick={() => console.log('Close button has been clicked')}>
            <img src={close_icon} style={imgStyle}/>
          </button>
          <p>Here is the list of notifications</p>
          <ul>
            <NotificationItem type='default' value='New course available'></NotificationItem>
            <NotificationItem type='urgent' value='New resume available'></NotificationItem>
            <NotificationItem type='urgent' html={{ __html: getLatestNotification() }}></NotificationItem>
          </ul>
        </div>)
        : <></>
      }
    </div>
  )
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool
};

Notifications.defaultProps = {
  displayDrawer: false
};

export default Notifications;
