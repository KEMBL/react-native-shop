/** Put here only those types which are used from more than one script */

export enum BootUpProgressEnum {
  Done = 0,
  Pending = 1,
  Fail = 2,
  NoStarted = 3
}

export class BootUpStatus {
  categoriesProgress = BootUpProgressEnum.Pending;
  productsProgress = BootUpProgressEnum.Pending;
  progress = BootUpProgressEnum.Pending;
  error?: string;
}
