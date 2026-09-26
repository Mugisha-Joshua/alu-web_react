import React from 'react';
import AppContext from '../App/AppContext';
import { getFullYear, getFooterCopy } from '../utils/utils';

export default function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <React.Fragment>
          <p>
            Copyright {getFullYear()} - {getFooterCopy(true)}
          </p>
          {user.isLoggedIn && (
            <p>
              <a href="#">Contact us</a>
            </p>
          )}
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
}
