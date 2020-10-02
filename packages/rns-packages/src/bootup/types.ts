/** Put here only those types which are used from more than one script */

export enum BootUpProgressEnum {
  Success = 0,
  Pending = 1,
  Fail = 2,
  NoStarted = 3
}

export interface BootUpStatus {
  progress: BootUpProgressEnum;
  error?: string;
}
