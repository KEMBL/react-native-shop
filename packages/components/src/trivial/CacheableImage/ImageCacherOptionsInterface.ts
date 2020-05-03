export interface ImageCacherOptionsInterface {
  validProtocols?: string[];
  fileHostWhitelist?: string[];
  cachePruneTriggerLimit?: number;
  fileDirName?: string;
  defaultPlaceholder?: string;
}
