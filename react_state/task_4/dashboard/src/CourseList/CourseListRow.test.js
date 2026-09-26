import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseListRow from './CourseListRow';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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

  it('applies a class name to the row', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
    );
    expect(wrapper.find('tr').props().className).toBeTruthy();
  });

  it('applies a different class name to a header row than to a normal row', () => {
    const headerRow = shallow(
      <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
    );
    const normalRow = shallow(
      <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
    );

    expect(headerRow.find('tr').props().className).not.toBe(
      normalRow.find('tr').props().className
    );
  });

  it('applies a different class name to the title cell than to a regular header cell', () => {
    const titleRow = shallow(
      <CourseListRow isHeader={true} textFirstCell="Available courses" />
    );
    const headerRow = shallow(
      <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
    );

    expect(titleRow.find('th').props().className).not.toBe(
      headerRow.find('th').first().props().className
    );
  });

  it('renders a checkbox in the first cell of a simple row', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
    );
    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox).toHaveLength(1);
    expect(wrapper.find('td').first().find('input[type="checkbox"]')).toHaveLength(1);
    expect(checkbox.props().checked).toBe(false);
  });

  it('does not render a checkbox in a header row', () => {
    const titleRow = shallow(
      <CourseListRow isHeader={true} textFirstCell="Available courses" />
    );
    const headerRow = shallow(
      <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
    );

    expect(titleRow.find('input[type="checkbox"]')).toHaveLength(0);
    expect(headerRow.find('input[type="checkbox"]')).toHaveLength(0);
  });

  it('uses the rowChecked styling once the checkbox is checked', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
        </tbody>
      </table>
    );
    const classNameBefore = wrapper.find('tr').props().className;

    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });

    expect(wrapper.find('tr').props().className).not.toBe(classNameBefore);
    expect(wrapper.find('input[type="checkbox"]').props().checked).toBe(true);

    wrapper.unmount();
  });

  it('goes back to the default styling when the checkbox is unchecked again', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
        </tbody>
      </table>
    );
    const classNameBefore = wrapper.find('tr').props().className;

    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: false } });

    expect(wrapper.find('tr').props().className).toBe(classNameBefore);
    expect(wrapper.find('input[type="checkbox"]').props().checked).toBe(false);

    wrapper.unmount();
  });
});
