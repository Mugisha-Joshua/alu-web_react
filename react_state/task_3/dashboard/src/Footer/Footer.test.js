import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import AppContext, { user as defaultUser, logOut as defaultLogOut } from '../App/AppContext';

const loggedInUser = {
  email: 'guillaume@holberton.io',
  password: 'secret',
  isLoggedIn: true,
};

const mountWithContext = (value) =>
  mount(
    <AppContext.Provider value={value}>
      <Footer />
    </AppContext.Provider>
  );

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = mountWithContext({ user: defaultUser, logOut: defaultLogOut });
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders the text "Copyright"', () => {
    const wrapper = mountWithContext({ user: defaultUser, logOut: defaultLogOut });
    expect(wrapper.text()).toContain('Copyright');
    wrapper.unmount();
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    const wrapper = mountWithContext({ user: defaultUser, logOut: defaultLogOut });

    expect(wrapper.find('a')).toHaveLength(0);
    expect(wrapper.text()).not.toContain('Contact us');
    wrapper.unmount();
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    const wrapper = mountWithContext({ user: loggedInUser, logOut: defaultLogOut });

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('a').text()).toBe('Contact us');
    wrapper.unmount();
  });
});
