import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const screenSize = {
  small: '@media (max-width: 900px)',
};

const styles = StyleSheet.create({
  item: {
    [screenSize.small]: {
      width: '100%',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
      listStyle: 'none',
    },
  },

  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
  },
});

function NotificationItem({ type, html, value, markAsRead, id }) {
  return (
    <li
      className={css(
        styles.item,
        type === 'urgent' ? styles.urgent : styles.default
      )}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
      dangerouslySetInnerHTML={value ? null : html}
    >
      {value || null}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
  id: 0,
};

export default React.memo(NotificationItem);
