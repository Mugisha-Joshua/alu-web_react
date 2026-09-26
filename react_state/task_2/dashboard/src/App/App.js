import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import AppContext, { user as defaultUser } from './AppContext';
import { getLatestNotification } from '../utils/utils';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  body: {
    padding: '32px',
    fontSize: '16px',
  },

  footer: {
    borderTop: '3px solid #e1003c',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: '24px 0',
  },
});

const LoginWithLogging = WithLogging(Login);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyCombination = this.handleKeyCombination.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      displayDrawer: false,
      value: {
        user: defaultUser,
        logOut: this.logOut,
      },
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyCombination);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyCombination);
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  handleKeyCombination(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  logIn(email, password) {
    this.setState({
      value: {
        ...this.state.value,
        user: {
          email,
          password,
          isLoggedIn: true,
        },
      },
    });
  }

  logOut() {
    this.setState({
      value: {
        ...this.state.value,
        user: defaultUser,
      },
    });
  }

  render() {
    const { displayDrawer, value } = this.state;

    return (
      <AppContext.Provider value={value}>
        <React.Fragment>
          <Notifications
            listNotifications={listNotifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
          />
          <div className={css(styles.app)}>
            <Header />
            <div className={css(styles.body)}>
              {value.user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <LoginWithLogging logIn={this.logIn} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the School">
                <p>
                  Holberton School is opening a new campus and the applications
                  are now open for the next cohort.
                </p>
              </BodySection>
            </div>
            <div className={css(styles.footer)}>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

export default App;
