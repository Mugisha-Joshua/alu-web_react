import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div.menuItem')).toHaveLength(1);
  });

  it('does not render the notifications panel when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  it('renders the notifications panel when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(1);
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

  it('calls console.log with the right message when markAsRead is called', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    wrapper.instance().markAsRead(1);

    expect(spy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    spy.mockRestore();
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

    const longerListNotifications = [
      ...listNotifications,
      { id: 4, type: 'default', value: 'New notification' },
    ];
    wrapper.setProps({ listNotifications: longerListNotifications });

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });
});
