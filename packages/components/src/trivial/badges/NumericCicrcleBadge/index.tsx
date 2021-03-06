import React from 'react';
import PropTypes from 'prop-types';

import { BadgeText } from 'rns-theme';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { CircleBadge } from '../CircleBadge';

export interface NumericCircleBadgeProps {
  count?: number;
  alwaysShow?: boolean;
  children?: React.ReactNode;
}

/**
 * Shows a circle badge with a given number  inside
 */
export const NumericCircleBadge: React.FC<NumericCircleBadgeProps> = ({ count, alwaysShow, children }): JSX.Element => {
  let badgeContent: JSX.Element | undefined = undefined;
  if (alwaysShow) {
    if (count === undefined) {
      count = 0;
    }
  }

  badgeContent = count === undefined ? undefined : <StylableText style={BadgeText}>{count}</StylableText>;

  return <CircleBadge badgeContent={badgeContent}>{children}</CircleBadge>;
};

NumericCircleBadge.propTypes = {
  count: PropTypes.number,
  alwaysShow: PropTypes.bool,
  children: PropTypes.object
};
