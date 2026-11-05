
import { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary-page">
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred while displaying the page.</p>
          <button onClick={() => window.location.reload()}>
            Reload website
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
