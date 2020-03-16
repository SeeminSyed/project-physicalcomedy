// https://blog.pusher.com/react-error-boundaries/
import React from 'react';

const alert = {
    color: 'red',
}


export default class ErrorBoundary extends React.Component {
    // state of the error
    state = { error: null, errorInfo: null };

    // error function
    // error is the error message
    // errorInfo is the add. info about the error
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
              <div>
                <details style={alert}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </details>
              </div>
            );
          }
  
          return this.props.children;
    }
}