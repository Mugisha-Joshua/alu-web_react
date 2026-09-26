import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const screenSize = {
  small: '@media (max-width: 900px)',
};

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0px)',
  },

  '50%': {
    transform: 'translateY(-5px)',
  },

  '100%': {
    transform: 'translateY(5px)',
  },
};

const styles = StyleSheet.create({
  menuItem: {
    float: 'right',
    position: 'relative',
    zIndex: 100,
    textAlign: 'right',
    padding: '8px',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',

    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: 3,
    },
  },

  menuItemHidden: {
    display: 'none',
  },

  notifications: {
    position: 'absolute',
    right: '8px',
    padding: '8px 16px',
    border: '2px dashed #e1003c',
    backgroundColor: 'white',

    [screenSize.small]: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100vh',
      padding: 0,
      border: 'none',
      fontSize: '20px',
      overflowY: 'auto',
      zIndex: 10,
    },
  },

  list: {
    paddingLeft: '24px',

    [screenSize.small]: {
      padding: 0,
      fontSize: '20px',
    },
  },

  closeButton: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
});

class Notifications extends React.PureComponent {
  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

    return (
      <React.Fragment>
        <div
          className={css(styles.menuItem, displayDrawer && styles.menuItemHidden)}
          onClick={handleDisplayDrawer}
        >
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              type="button"
              aria-label="Close"
              className={css(styles.closeButton)}
              onClick={handleHideDrawer}
            >
              <img src={closeIcon} alt="close icon" width="15px" />
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.list)}>
              {listNotifications.length === 0 && (
                <NotificationItem value="No new notification for now" />
              )}
              {listNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={markNotificationAsRead}
                />
              ))}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;
