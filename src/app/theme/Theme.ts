import { default as platformVars } from "./Platform";

class Theme {
  // Platform dependent variables
  public platform = platformVars;

  // Colors
  public green = "green";
  public white = "white";
  public grey = "grey";
}

const appThemeInstance = new Theme();
export { appThemeInstance as Theme };
