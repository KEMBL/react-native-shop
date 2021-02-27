import React from 'react';

import { Navigation } from 'components/src/context';

/**
 * Application logic starts here
 * Here we make initial loading of necessary data right before start business logic
 *
 * @returns {React.FC} Component with the main application logic
 */
export const Application: React.FC = (): JSX.Element => {
  return <Navigation />;
};
