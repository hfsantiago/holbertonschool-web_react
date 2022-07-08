import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { displayNotificationDrawer, hideNotificationDrawer } from '../actions/uiActionCreators';
import { loginRequest as login, logout } from '../actions/uiActionCreators';


const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification()} }
];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.state = {
      listNotifications: listNotifications
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleClick);
  }

  handleClick(event) {
    if (event.keyCode === 72 && event.ctrlKey) {
      alert('Logging you out');
      this.props.logout();
    }
  }

  markNotificationAsRead(id) {
    this.setState({ listNotifications: this.state.listNotifications.filter(notification => { return notification.id !== id }) });
  }

  render() {
    const { listNotifications } = this.state;
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, login, logout } = this.props;
    return (
      <>
        <Notifications listNotifications={listNotifications} displayDrawer={displayDrawer} 
                       handleDisplayDrawer={displayNotificationDrawer} handleHideDrawer={hideNotificationDrawer}
                       markNotificationAsRead={this.markNotificationAsRead}></Notifications>
        <div className='App'>
          <Header></Header>
          <div className={css(style.appBody)}>
            {isLoggedIn ? 
              <BodySectionWithMarginBottom title='Course list'>
                <CourseList listCourses={listCourses} ></CourseList>
              </BodySectionWithMarginBottom> : 
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login logIn={login}></Login>
              </BodySectionWithMarginBottom>}
            <BodySection title='News from the School'>
              <p>Some news</p>
            </BodySection>
          </div>
          <div className={css(style.appFooter)}>
            <Footer></Footer>
          </div>
        </div>
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
};

const style = StyleSheet.create({
  appBody: {
    backgroundColor: '#fff',
    padding: '4rem',
    minHeight: '26rem',
  },
  appFooter: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '100%',
    bottom: '0px',
    borderTop: '3px solid #e1354b',
    fontStyle: 'italic',
    padding: '1rem 0'
  }
});

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.get("isUserLoggedIn"),
    displayDrawer: state.ui.get("isNotificationDrawerVisible")
  };
};

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
 