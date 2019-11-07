import React, {PureComponent} from 'react';

// import MainPage from "./views/MainPage";
import ProductPage from './views/ProductPage';
import {ProductModel} from './models/Product/ProductModels';
import {StoreService} from './services/store/Store.service';
import {Provider, connect} from 'react-redux';
import {ApplicationState} from './models/Application/ApplicationState';

import {dispatchProductsRequest} from './services/redux/ducks/Products.duck';

// const product: ProductModel = {
//   id: '1',
//   name:
//     'New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One & Only (Ван & Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом',
//   price: {
//     title: 'Вес',
//     properties: [
//       {price: 250, property: '250гр'},
//       {price: 320, property: '350гр'},
//       {price: 1200, property: '2кг'},
//       {price: 2500, property: '7.5кг'}
//     ]
//     // prices: [250, 320, 1200, 2500],
//     // price_properties: ["250гр", "350гр", "2кг", "7.5кг"]
//   },
//   category_id: '1',
//   image_url: [
//     'http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg'
//   ]
// };

interface MainProps {
  products: ProductModel[];
}

// export default
class Main extends PureComponent<MainProps> {
  public render() {
    const store = StoreService.getStore;
    const product1 = this.props.products[0];
    // return <MainPage />;
    return (
      <Provider store={store}>
        <ProductPage product={product1} />
      </Provider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const products = state.get('productsState').products;
  return {
    products
  };
};

const mapDispatchToProps = {
  dispatchProductsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
