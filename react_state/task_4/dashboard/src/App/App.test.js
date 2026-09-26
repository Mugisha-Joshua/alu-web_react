import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
import { user as defaultUser } from './AppContext';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

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

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a Notifications, Header and Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('renders the login section and no CourseList when the user is logged out', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('WithLogging(Login)')).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
    expect(wrapper.find(BodySectionWithMarginBottom).props().title).toBe(
      'Log in to continue'
    );
  });

  it('renders the CourseList when isLoggedIn is true in the state', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      value: { user: loggedInUser, logOut: wrapper.instance().logOut },
    });

    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(0);
    expect(wrapper.find(BodySectionWithMarginBottom).props().title).toBe(
      'Course list'
    );
  });

  it('has a default state with a logged out user', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().value.user).toEqual(defaultUser);
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('updates the state correctly when logIn is called', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().logIn('guillaume@holberton.io', 'secret');

    expect(wrapper.state().value.user).toEqual(loggedInUser);
  });

  it('updates the state correctly when logOut is called', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().logIn('guillaume@holberton.io', 'secret');
    expect(wrapper.state().value.user.isLoggedIn).toBe(true);

    wrapper.instance().logOut();

    expect(wrapper.state().value.user).toEqual(defaultUser);
  });

  it('has a default state for displayDrawer set to false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toBe(true);
  });

  it('sets displayDrawer back to false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().handleDisplayDrawer();
    wrapper.instance().handleHideDrawer();

    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('passes the displayDrawer state down to Notifications', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Notifications).props().displayDrawer).toBe(false);

    wrapper.setState({ displayDrawer: true });

    expect(wrapper.find(Notifications).props().displayDrawer).toBe(true);
  });

  it('logs the user out and alerts when ctrl and h are pressed', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App />);

    wrapper.instance().logIn('guillaume@holberton.io', 'secret');
    expect(wrapper.state().value.user.isLoggedIn).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', ctrlKey: true }));

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(wrapper.state().value.user).toEqual(defaultUser);

    alertSpy.mockRestore();
    wrapper.unmount();
  });

  it('does not log the user out when only h is pressed', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App />);

    wrapper.instance().logIn('guillaume@holberton.io', 'secret');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));

    expect(alertSpy).not.toHaveBeenCalled();
    expect(wrapper.state().value.user.isLoggedIn).toBe(true);

    alertSpy.mockRestore();
    wrapper.unmount();
  });

  it('has the list of notifications in its state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().listNotifications).toHaveLength(3);
    expect(wrapper.find(Notifications).props().listNotifications).toEqual(
      wrapper.state().listNotifications
    );
  });

  it('removes the right notification from the state when markNotificationAsRead is called', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' },
      ],
    });

    wrapper.instance().markNotificationAsRead(2);

    const { listNotifications } = wrapper.state();
    expect(listNotifications).toHaveLength(2);
    expect(listNotifications.map((n) => n.id)).toEqual([1, 3]);
    expect(
      listNotifications.find((n) => n.id === 2)
    ).toBeUndefined();
  });
});
