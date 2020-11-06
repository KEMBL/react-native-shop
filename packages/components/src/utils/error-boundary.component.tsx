/* eslint-disable react/prop-types */
import React, { ReactNode } from 'react';
import { Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyProps {}

interface MyState {
  hasError: boolean;
}

/**
 * Try Catch for React declarative programming
 * More https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (error: unknown): MyState => {
    // eslint-disable-next-line no-console
    console.error('Error state from error', error);
    return { hasError: true };
  };

  componentDidCatch = (error: unknown, errorInfo: unknown): void => {
    // eslint-disable-next-line no-console
    console.error('Error in child component', error, errorInfo);
  };

  render = (): ReactNode => {
    if (this.state.hasError) {
      return <Text>Error!</Text>;
    }

    return this.props.children;
  };
}
