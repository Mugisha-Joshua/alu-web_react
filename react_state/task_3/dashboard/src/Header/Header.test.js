import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Header from './Header';
import AppContext, { user as defaultUser, logOut as defaultLogOut } from '../App/AppContext';

const loggedInUser = {
  email: 'guillaume@holberton.io',
  password: 'secret',
  isLoggedIn: true,
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<Header />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders an img and a h1 tag', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
    wrapper.unmount();
  });

  it('does not create the logoutSection with the default context value', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    wrapper.unmount();
  });

  it('creates the logoutSection when the user is logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain(
      'guillaume@holberton.io'
    );
    wrapper.unmount();
  });

  it('calls the logOut function from the context when clicking on the link', () => {
    const logOut = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    wrapper.find('#logoutSection a').simulate('click');

    expect(logOut).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
