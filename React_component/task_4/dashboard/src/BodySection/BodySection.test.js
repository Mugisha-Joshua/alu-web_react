import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('<BodySection />', () => {
  it('renders one h2 with the title and the children', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('h2').text()).toBe('test title');
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('p').text()).toBe('test children node');
  });

  it('renders a div with the class bodySection', () => {
    const wrapper = shallow(<BodySection title="test title" />);
    expect(wrapper.find('div.bodySection')).toHaveLength(1);
  });
});
