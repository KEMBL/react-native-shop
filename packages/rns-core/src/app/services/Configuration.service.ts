interface ConfiguationServiceInterface {
  currency: string;
  baseApiURL: string;
  remoteDevServerHostname: string;
  remoteDevServerPort: number;
  remoteDevServerActive: boolean;
  getProductsUrl: string;
  priceError: string;
}

const ConfiguationService = (): ConfiguationServiceInterface => {
  const currency = 'руб.';
  const baseApiURL = 'http://api.termokot.ru/graphql';
  const priceError = 'Ошибка цены';
  /**
   * Should be the same as hostname remotedev script of package.json
   * !!! Do not forget to start remotedev-server
   */
  const remoteDevServerHostname = 'localhost';
  /**
   * Should be the same as port remotedev script of package.json
   */
  const remoteDevServerPort = 8888;
  /**
   * Use DevTools server
   */
  const remoteDevServerActive = false;
  /**
   * API endpoint fro getting products
   */
  const getProductsUrl = `${baseApiURL}/rns/api/products.json`;

  return {
    currency,
    baseApiURL: baseApiURL,
    remoteDevServerHostname,
    remoteDevServerPort,
    remoteDevServerActive,
    getProductsUrl,
    priceError
  };
};

const configuationService = ConfiguationService();
export { configuationService as ConfiguationService };
