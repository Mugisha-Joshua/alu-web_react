import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value, markAsRead, id }) {
  return value ? (
    <li data-notification-type={type} onClick={() => markAsRead(id)}>
      {value}
    </li>
  ) : (
    <li
      data-notification-type={type}
      dangerouslySetInnerHTML={html}
      onClick={() => markAsRead(id)}
    />
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
