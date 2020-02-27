import React from 'react';
import ErrorMessagePageLine from '../PageLine/ErrorMessagePageLine';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessagePageLine msg="An error occured. Please try again later." />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
