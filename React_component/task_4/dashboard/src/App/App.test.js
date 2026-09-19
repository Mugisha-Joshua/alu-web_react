import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

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

  it('renders the login section and no CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
    expect(wrapper.find(BodySectionWithMarginBottom).props().title).toBe(
      'Log in to continue'
    );
  });

  it('renders the CourseList and no login section when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(0);
    expect(wrapper.find(BodySectionWithMarginBottom).props().title).toBe('Course list');
  });

  it('calls logOut and displays the alert when ctrl and h are pressed', () => {
    const logOut = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App logOut={logOut} />);

    const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
    document.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    expect(logOut).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
    wrapper.unmount();
  });

  it('does not call logOut when only h is pressed', () => {
    const logOut = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App logOut={logOut} />);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));

    expect(logOut).not.toHaveBeenCalled();

    alertSpy.mockRestore();
    wrapper.unmount();
  });
});
