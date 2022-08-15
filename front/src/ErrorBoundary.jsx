import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          display: 'flex',
          justifyContent: 'center'
        }}
        >Something went wrong.
        </h1>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    return this.props.children;
  }
}
