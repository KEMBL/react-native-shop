import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { CicrcleBadgeTheme } from 'rns-theme';

export interface IconBadgeProps {
  badgeContent?: React.ReactNode;
  alwaysShow?: boolean;
  children?: React.ReactNode;
}

/**
 * Shows a circle badge with a given content inside
 */
export const CircleBadge: React.FC<IconBadgeProps> = ({ badgeContent, alwaysShow, children }): JSX.Element => {
  return (
    <View style={CicrcleBadgeTheme.wrapper}>
      {children}
      {(alwaysShow || badgeContent) && <View style={CicrcleBadgeTheme.innerContainer}>{badgeContent}</View>}
    </View>
  );
};

CircleBadge.propTypes = {
  badgeContent: PropTypes.object,
  alwaysShow: PropTypes.bool,
  children: PropTypes.object
};
