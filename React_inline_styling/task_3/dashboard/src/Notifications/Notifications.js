import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const screenSize = {
  small: '@media (max-width: 900px)',
};

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    padding: '8px',
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

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <React.Fragment>
        <div className={css(styles.menuItem)}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              type="button"
              aria-label="Close"
              className={css(styles.closeButton)}
              onClick={() => console.log('Close button has been clicked')}
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
                  markAsRead={this.markAsRead}
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
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
