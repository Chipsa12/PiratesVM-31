import React from 'react';
import ErrorIndicator from './error-indicator';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, info): void {
    this.setState({
      hasError: true,
    });
  }

  clearError = () => {
    this.setState({
      hasError: false,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator resetError={this.clearError} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
