import { Platform } from './Platform';

class Theme {
  // Platform dependent variables
  public platform = Platform;

  // Colors
  public green = '#01875F';
  public darkGreen = '#016C4C';
  public white = 'white';
  public grey = 'grey';
  public middleGrey = '#A6A6A6';
  public lightGrey = '#F2F2F2';
  public black = 'black'; // "#212121";
  public red = 'red';

  // text
  public fontFamily = this.platform.isIos
    ? 'System'
    : this.platform.isWeb
    ? '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,sans-serif'
    : 'Roboto_medium';
  public textColor = this.black;
}

const appThemeInstance = new Theme();
export { appThemeInstance as Theme };
