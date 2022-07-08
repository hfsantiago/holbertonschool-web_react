import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import logo from '../assets/holbertonlogo.jpg';
import { logout } from "../actions/uiActionCreators";

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, logout } = this.props;

    return (
      <div className={css(style.appHeader)}>
        <img src={logo} className={css(style.appLogo)} alt='logo'/>
        <h1 className={css(style.appHeaderH1)}>School dashboard</h1>

        { user ?
          <p id="logoutSection" className={css(style.logOut)}>Welcome {user.email} (<span onClick={logout}>logout</span>)</p>
          :
          <></>
        }
      </div>
    );
  }
}

const style = StyleSheet.create({
  appHeader: {
    backgroundColor: '#fff',
    borderBottom: '3px solid #e1354b',
  },
  appLogo: {
    width: '200px',
    height: '200px',
  },
  appHeaderH1: {
    display: 'inline',
    position: 'relative',
    top: '-6rem',
    color: '#e1354b',
  },
  logOut: {
    textAlign: 'end'
  }
});

Header.defaultProps = {
  user: null,
  logout: () => {},
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.get('user'),
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
