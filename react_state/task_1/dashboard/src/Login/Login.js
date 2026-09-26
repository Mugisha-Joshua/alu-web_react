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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
      isLoggedIn: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.updateEnableSubmit = this.updateEnableSubmit.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.updateEnableSubmit);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }, this.updateEnableSubmit);
  }

  updateEnableSubmit() {
    const { email, password } = this.state;

    this.setState({ enableSubmit: email !== '' && password !== '' });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <React.Fragment>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit} className={css(styles.body)}>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="email" className={css(styles.label)}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
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
              value={password}
              onChange={this.handleChangePassword}
              className={css(styles.input)}
            />
          </div>
          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className={css(styles.button)}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
