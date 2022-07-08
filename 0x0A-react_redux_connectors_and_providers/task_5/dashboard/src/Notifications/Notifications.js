import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'; // ES6

import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { StyleSheet, css } from 'aphrodite';
import { fetchNotifications } from "../actions/notificationActionCreators";

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

export class Notifications extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;

    return (
      <div className={css(style.notificationContainer, style.mediumNotificationContainer)}>
        <div className={css(style.menuItem, displayDrawer ? style.hideElement : '')} id="menuItem" onClick={handleDisplayDrawer}>Your notifications</div>
        { displayDrawer ?
          (<div className={css(style.notifications, style.mediumNotification)} id="notifications">
            <button style={btnStyle} aria-label='Close' onClick={handleHideDrawer} id="closeMenuItem">
              <img src={close_icon} style={imgStyle}/>
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(style.mediumUl)}>
              {!listNotifications ? (<NotificationItem id='0' value="No new notification for now" type='no-new' />) : <></>}
              {listNotifications && Object.values(listNotifications).map((list) => (
                <NotificationItem 
                  id={list.guid}
                  key={list.guid}
                  type={list.type}
                  value={list.value}
                  html={list.html}
                  markAsRead={markNotificationAsRead}/>))}
            </ul>
          </div>)
          : <></>
        }
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: null,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  fetchNotifications: () => {},
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

const mapStateToProps = (state) => {
  return {
    listNotifications: state.notifications.get("messages"),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
