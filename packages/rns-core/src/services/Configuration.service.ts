/**
 * Main application configuration
 */
export class ConfiguationService {
  /**
   * Source of application external data
   */
  public static baseApiURL = 'https://api.termokot.ru/graphql';
  /**
   * Should be the same as hostname remotedev script of package.json
   * !!! Do not forget to start remotedev-server
   */
  public static remoteDevServerHostname = 'localhost';
  /**
   * Should be the same as port remotedev script of package.json
   */
  public static remoteDevServerPort = 8081;
  /**
   * Boolean specifies whether to allow remote monitoring
   */
  public static allowRealtimeDebug = true;
  /**
   * Use DevTools server
   */
  public static remoteDevServerActive = true;
}
