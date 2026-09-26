import React from 'react';

export default function WithLogging(WrappedComponent) {
  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithLoggingComponent extends React.Component {
    componentDidMount() {
      console.log(`Component ${wrappedName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${wrappedName})`;

  return WithLoggingComponent;
}
