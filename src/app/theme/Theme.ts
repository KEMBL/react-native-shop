import { default as platformVars } from "./Platform";

class Theme {
  // Platform dependent variables
  public platform = platformVars;

  // Colors
  public green = "#01875F";
  public darkGreen = "#016C4C";
  public white = "white";
  public grey = "grey";
  public black = "black"; //"#212121";

  // text
  public fontFamily = platformVars.isIos ? "System" : "Roboto_medium";
  public textColor = this.black;
}

const appThemeInstance = new Theme();
export { appThemeInstance as Theme };
