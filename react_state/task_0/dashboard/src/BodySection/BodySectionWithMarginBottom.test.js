import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<BodySectionWithMarginBottom />', () => {
  it('renders a div containing a BodySection', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').props().className).toBeDefined();
    expect(wrapper.find(BodySection)).toHaveLength(1);
  });

  it('passes the props down to the BodySection child component', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    const bodySection = wrapper.find(BodySection);

    expect(bodySection.props().title).toBe('test title');
    expect(bodySection.props().children).toBeDefined();
  });
});
