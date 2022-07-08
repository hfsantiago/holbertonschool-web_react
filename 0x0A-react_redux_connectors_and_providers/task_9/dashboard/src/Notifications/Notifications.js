import React from 'react';
import PropTypes from 'prop-types'; // ES6

import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { StyleSheet, css } from 'aphrodite';

var _ = require('lodash');

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

function Notifications(props) {
  const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead, setNotificationFilter } = props;

  return (
    <div className={css(style.notificationContainer, style.mediumNotificationContainer)}>
      <div className={css(style.menuItem, displayDrawer ? style.hideElement : '')} id="menuItem" onClick={handleDisplayDrawer}>Your notifications</div>
      { displayDrawer ?
        (<div className={css(style.notifications, style.mediumNotification)} id="notifications">
          <button style={btnStyle} aria-label='Close' onClick={handleHideDrawer} id="closeMenuItem">
            <img src={close_icon} style={imgStyle}/>
          </button>
          <p>Here is the list of notifications</p>
          <button type="button" id="buttonFilterUrgent" onClick={() => { setNotificationFilter("URGENT"); }} >❗❗</button>
          <button type="button" id="buttonFilterDefault" onClick={() => { setNotificationFilter("DEFAULT"); }} > 💠 </button>
          <div>
            <ul className={css(style.mediumUl)}>
              {!listNotifications || _.size(listNotifications.toJS()) === 0 ? (<NotificationItem id='0' value="No new notification for now" type='no-new' />) : <></>}
              {listNotifications && listNotifications.valueSeq().map((notification) => {
                let html = notification["html"];
                if (html) html = html.toJS();
                return (
                  <NotificationItem
                    key={notification["guid"]}
                    id={notification["guid"]}
                    type={notification["type"]}
                    value={notification["value"]}
                    html={html}
                    markAsRead={markNotificationAsRead}
                  />
                );
              })}
            </ul>
          </div>
        </div>)
        : <></>
      }
    </div>
  );
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

const opacityKeyframes = {
  'from': {
    opacity: 0.5,
  },

  'to': {
      opacity: 1,
  }
};

const translateKeyframes = {
  '0%': {
      transform: 'translateY(0)',
  },

  '50%': {
      transform: 'translateY(-5px)',
  },
  '75%': {
    transform: 'translateY(5px)',
  },
  '100%': {
      transform: 'translateY(0)',
  },
};

const style = StyleSheet.create({
  notifications: {
    border: '3px dashed #e1354b',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    width: '25rem',
    background: 'white none repeat scroll 0% 0%',
  },
  mediumNotification: {
    '@media (max-width: 900px)': {
      border: 'none',
      width: '100%',
      height: '100%',
    }
  },
  menuItem: {
    marginBottom: '10px',
    float: 'right',
    textAlign: 'end',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    ':hover': {
      animationName: [opacityKeyframes, translateKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    }
  },
  notificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: '12px',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  mediumNotificationContainer: {
    '@media (max-width: 900px)': {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '6',
      display: 'block !important',
    }
  },
  hideElement: {
    display: 'none',
  },
  mediumUl: {
    '@media (max-width: 900px)': {
      fontSize: '20px',
      padding: '0',
    }
  }
});

export default Notifications;
