import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../App/AppContext';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: '#e1003c',
    fontSize: '20px',
    borderBottom: '3px solid #e1003c',
  },

  logo: {
    width: '200px',
    height: '200px',
  },

  logoutSection: {
    margin: '8px 0 0 8px',
    fontSize: '14px',
  },

  link: {
    color: '#e1003c',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

class Header extends React.Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <React.Fragment>
        <div className={css(styles.header)}>
          <img src={logo} className={css(styles.logo)} alt="holberton logo" />
          <h1>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <p id="logoutSection" className={css(styles.logoutSection)}>
            Welcome <strong>{user.email}</strong> (
            <a onClick={logOut} className={css(styles.link)}>
              logout
            </a>
            )
          </p>
        )}
      </React.Fragment>
    );
  }
}

Header.contextType = AppContext;

export default Header;
