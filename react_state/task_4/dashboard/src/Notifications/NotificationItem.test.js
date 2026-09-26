import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationItem from './NotificationItem';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct html with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    const li = wrapper.find('li');
    expect(li).toHaveLength(1);
    expect(li.props()['data-notification-type']).toBe('default');
    expect(li.text()).toBe('test');
  });

  it('renders the correct html with the html prop', () => {
    const wrapper = shallow(
      <NotificationItem type="urgent" html={{ __html: '<u>test</u>' }} />
    );
    const li = wrapper.find('li');
    expect(li.props()['data-notification-type']).toBe('urgent');
    expect(li.props().dangerouslySetInnerHTML).toEqual({ __html: '<u>test</u>' });
  });

  it('applies a class name to a default item', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find('li').props().className).toBeTruthy();
  });

  it('applies a different class name to an urgent item', () => {
    const defaultItem = shallow(<NotificationItem type="default" value="test" />);
    const urgentItem = shallow(<NotificationItem type="urgent" value="test" />);

    expect(urgentItem.find('li').props().className).not.toBe(
      defaultItem.find('li').props().className
    );
  });

  it('calls markAsRead with the right id when the item is clicked', () => {
    const markAsRead = jest.fn();
    const wrapper = shallow(
      <NotificationItem type="default" value="test" id={1} markAsRead={markAsRead} />
    );

    wrapper.find('li').simulate('click');

    expect(markAsRead).toHaveBeenCalledWith(1);
    expect(markAsRead).toHaveBeenCalledTimes(1);
  });
});
