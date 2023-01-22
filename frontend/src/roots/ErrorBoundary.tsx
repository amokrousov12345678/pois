import React from "react";

class Props {
}

class State {
    hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Упс, что-то отвалилось</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
