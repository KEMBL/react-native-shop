/**
 * MAin application configuration
 */
export class ConfiguationService {
  public static currency = 'руб.';
  public static baseApiURL = 'http://api.termokot.ru/graphql';
  public static priceError = 'Ошибка цены';
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
  /**
   * API endpoint fro getting products
   */
  public static getProductsUrl = `${ConfiguationService.baseApiURL}/rns/api/products.json`;
}
