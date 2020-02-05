const ConfiguationService = () => {
  const currency = 'руб.';
  const baseURL = 'http://kembl.ru';
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
   * API endpoint fro getting products
   */
  const getProductsUrl = `${baseURL}/rns/api/products.json`;

  return {
    currency,
    baseURL,
    remoteDevServerHostname,
    remoteDevServerPort,
    getProductsUrl,
    priceError
  };
};

const configuationService = ConfiguationService();
export default configuationService;
