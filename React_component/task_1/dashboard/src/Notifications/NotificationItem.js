import React from 'react';
import PropTypes from 'prop-types';

export default function NotificationItem({ type, html, value }) {
  return value ? (
    <li data-notification-type={type}>{value}</li>
  ) : (
    <li data-notification-type={type} dangerouslySetInnerHTML={html} />
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
};

NotificationItem.defaultProps = {
  type: 'default',
};
