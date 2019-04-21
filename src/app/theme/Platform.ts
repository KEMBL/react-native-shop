import {
  Platform as PlatformRN,
  Dimensions,
  PlatformOSType
} from "react-native";

class Platform {
  public deviceHeight: number;
  public deviceWidth: number;
  public operationSystem: PlatformOSType;
  public isIos: boolean;

  constructor() {
    this.deviceHeight = Dimensions.get("window").height;
    this.deviceWidth = Dimensions.get("window").width;
    this.operationSystem = PlatformRN.OS;
    this.isIos = this.operationSystem === "ios";
  }
}

const platformInstance = new Platform();
export default platformInstance;
