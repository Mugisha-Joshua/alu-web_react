import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div').first().text()).toContain('Your notifications');
  });

  it('does not render the notifications panel when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('ul')).toHaveLength(0);
    expect(wrapper.text()).not.toContain('Here is the list of notifications');
  });

  it('renders the notifications panel when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('ul')).toHaveLength(1);
  });

  it('renders "Here is the list of notifications" when the drawer is displayed', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    expect(wrapper.text()).toContain('Here is the list of notifications');
  });

  it('renders correctly when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(1);
    expect(wrapper.find(NotificationItem).props().value).toBe(
      'No new notification for now'
    );
  });

  it('renders a NotificationItem for each notification', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
    expect(wrapper.find(NotificationItem).first().props().value).toBe(
      'New course available'
    );
  });

  it('passes markNotificationAsRead down to each NotificationItem', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    expect(wrapper.find(NotificationItem).first().props().markAsRead).toBe(
      markNotificationAsRead
    );
  });

  it('calls markNotificationAsRead with the right id when an item is clicked', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = mount(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    wrapper.find('li').at(1).simulate('click');

    expect(markNotificationAsRead).toHaveBeenCalledWith(2);
    wrapper.unmount();
  });

  it('calls handleDisplayDrawer when clicking on the menu item', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );

    wrapper.find('div').first().simulate('click');

    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  it('calls handleHideDrawer when clicking on the close button', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );

    wrapper.find('button').simulate('click');

    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

  it('does not rerender when updating the props with the same list', () => {
    const spy = jest.spyOn(Notifications.prototype, 'render');
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );

    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({ listNotifications });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('rerenders when updating the props with a longer list', () => {
    const spy = jest.spyOn(Notifications.prototype, 'render');
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );

    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      listNotifications: [
        ...listNotifications,
        { id: 4, type: 'default', value: 'New notification' },
      ],
    });

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('rerenders when the displayDrawer prop changes', () => {
    const spy = jest.spyOn(Notifications.prototype, 'render');
    const wrapper = shallow(
      <Notifications displayDrawer={false} listNotifications={listNotifications} />
    );

    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({ displayDrawer: true });

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('hides the menu item when the notifications panel is displayed', () => {
    const closed = shallow(<Notifications displayDrawer={false} />);
    const opened = shallow(<Notifications displayDrawer={true} />);

    expect(opened.find('div').first().props().className).not.toBe(
      closed.find('div').first().props().className
    );
  });
});
