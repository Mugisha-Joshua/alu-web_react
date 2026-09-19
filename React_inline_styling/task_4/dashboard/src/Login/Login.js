import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const screenSize = {
  small: '@media (max-width: 900px)',
};

const styles = StyleSheet.create({
  body: {
    margin: '48px 0',

    [screenSize.small]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: '24px 0',
    },
  },

  inputGroup: {
    display: 'inline-block',

    [screenSize.small]: {
      display: 'block',
      width: '100%',
      marginBottom: '8px',
    },
  },

  label: {
    marginRight: '8px',
  },

  input: {
    marginRight: '16px',

    [screenSize.small]: {
      marginRight: 0,
    },
  },

  button: {
    [screenSize.small]: {
      display: 'block',
      marginTop: '8px',
    },
  },
});

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.body)}>
        <div className={css(styles.inputGroup)}>
          <label htmlFor="email" className={css(styles.label)}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={css(styles.input)}
          />
        </div>
        <div className={css(styles.inputGroup)}>
          <label htmlFor="password" className={css(styles.label)}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={css(styles.input)}
          />
        </div>
        <button className={css(styles.button)}>OK</button>
      </div>
    </React.Fragment>
  );
}
