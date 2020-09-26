import { Platform as PlatformRN, Dimensions, PlatformOSType } from 'react-native';

export interface PlatformInterface {
  deviceHeight: number;
  deviceWidth: number;
  operationSystem: PlatformOSType;
  isIos: boolean;
  isWeb: boolean;
}

export const Platform: PlatformInterface = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  operationSystem: PlatformRN.OS,
  isIos: PlatformRN.OS === 'ios',
  isWeb: PlatformRN.OS === 'web'
};
