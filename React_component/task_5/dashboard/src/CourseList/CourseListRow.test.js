import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('<CourseListRow />', () => {
  it('renders one cell with colspan = 2 when isHeader is true and textSecondCell is null', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="Available courses" />
    );
    const th = wrapper.find('th');
    expect(th).toHaveLength(1);
    expect(th.props().colSpan).toBe('2');
    expect(th.text()).toBe('Available courses');
  });

  it('renders two cells when isHeader is true and textSecondCell is present', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
    );
    expect(wrapper.find('th')).toHaveLength(2);
  });

  it('renders two td elements when isHeader is false', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
    );
    expect(wrapper.find('td')).toHaveLength(2);
  });
});
