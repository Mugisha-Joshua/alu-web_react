import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  body: {
    margin: '48px 0',
  },

  label: {
    marginRight: '8px',
  },

  input: {
    marginRight: '16px',
  },
});

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.body)}>
        <label htmlFor="email" className={css(styles.label)}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={css(styles.input)}
        />
        <label htmlFor="password" className={css(styles.label)}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={css(styles.input)}
        />
        <button>OK</button>
      </div>
    </React.Fragment>
  );
}
