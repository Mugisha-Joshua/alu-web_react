import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';

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
});

export default function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1>School dashboard</h1>
    </div>
  );
}
