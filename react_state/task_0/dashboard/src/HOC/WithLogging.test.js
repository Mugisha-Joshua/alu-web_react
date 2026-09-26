import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('WithLogging', () => {
  it('logs "Component" on mount and unmount when the wrapped element is pure html', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const WrappedHtml = WithLogging(() => <p />);
    const wrapper = mount(<WrappedHtml />);

    expect(spy).toHaveBeenCalledWith('Component Component is mounted');

    wrapper.unmount();

    expect(spy).toHaveBeenCalledWith('Component Component is going to unmount');
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('logs the component name on mount and unmount when wrapping the Login component', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const WrappedLogin = WithLogging(Login);
    const wrapper = mount(<WrappedLogin />);

    expect(spy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();

    expect(spy).toHaveBeenCalledWith('Component Login is going to unmount');
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('sets the displayName of the returned component', () => {
    const WrappedLogin = WithLogging(Login);
    expect(WrappedLogin.displayName).toBe('WithLogging(Login)');
  });
});
