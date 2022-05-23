import React from 'react';
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'
import Footer from '../Footer/Footer'
import PropTypes from 'prop-types'; // ES6
import { getLatestNotification } from '../utils/utils'

function App({ isLoggedIn }) {
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

  return (
    <React.Fragment>
      <Notifications listNotifications={listNotifications}></Notifications>
      <div className='App'>
        <Header></Header>
        {isLoggedIn ? <CourseList listCourses={listCourses} ></CourseList> : <Login></Login>}
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
};

App.defaultProps = {
  isLoggedIn: false
};

export default App;
