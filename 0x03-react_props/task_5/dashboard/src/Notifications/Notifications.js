import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types'; // ES6
import NotificationItemShape from './NotificationItemShape';


const Notifications = ({ displayDrawer, listNotifications }) => {
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
            {listNotifications.length === 0 ? (<NotificationItem value="No new notification for now" type='no-new' />) : <></>}
            {listNotifications.map((list) => (<NotificationItem key={list.id} type={list.type} value={list.value} html={list.html} />))}
          </ul>
        </div>)
        : <></>
      }
    </div>
  )
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: []
};

export default Notifications;
