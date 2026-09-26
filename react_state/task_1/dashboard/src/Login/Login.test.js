import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<Login />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 2 labels, 2 inputs and a submit input inside a form', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('input[type="email"]')).toHaveLength(1);
    expect(wrapper.find('input[type="password"]')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
  });

  it('has the default state values set in the constructor', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.state()).toEqual({
      email: '',
      password: '',
      enableSubmit: false,
      isLoggedIn: false,
    });
  });

  it('has the submit button disabled by default', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input[type="submit"]').props().disabled).toBe(true);
  });

  it('enables the submit button after both inputs have a value', () => {
    const wrapper = shallow(<Login />);

    wrapper
      .find('input[type="email"]')
      .simulate('change', { target: { value: 'guillaume@holberton.io' } });
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { value: 'secret' } });
    wrapper.update();

    expect(wrapper.state().email).toBe('guillaume@holberton.io');
    expect(wrapper.state().password).toBe('secret');
    expect(wrapper.state().enableSubmit).toBe(true);
    expect(wrapper.find('input[type="submit"]').props().disabled).toBe(false);
  });

  it('keeps the submit button disabled when only one input has a value', () => {
    const wrapper = shallow(<Login />);

    wrapper
      .find('input[type="email"]')
      .simulate('change', { target: { value: 'guillaume@holberton.io' } });
    wrapper.update();

    expect(wrapper.state().enableSubmit).toBe(false);
    expect(wrapper.find('input[type="submit"]').props().disabled).toBe(true);
  });

  it('disables the submit button again when an input is emptied', () => {
    const wrapper = shallow(<Login />);

    wrapper
      .find('input[type="email"]')
      .simulate('change', { target: { value: 'guillaume@holberton.io' } });
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { value: 'secret' } });
    expect(wrapper.state().enableSubmit).toBe(true);

    wrapper.find('input[type="password"]').simulate('change', { target: { value: '' } });
    wrapper.update();

    expect(wrapper.state().enableSubmit).toBe(false);
    expect(wrapper.find('input[type="submit"]').props().disabled).toBe(true);
  });

  it('sets isLoggedIn to true when the form is submitted, without reloading', () => {
    const wrapper = shallow(<Login />);
    const preventDefault = jest.fn();

    wrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state().isLoggedIn).toBe(true);
  });
});
