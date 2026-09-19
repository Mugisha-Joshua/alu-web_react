import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

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
});
