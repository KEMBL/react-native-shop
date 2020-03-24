import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ProductLoadingState} from './app/models/Product/ProductModels';
import {InitialLoadingPage} from './app/views/InitialLoadingPage';
import {
  actionProductsRequest,
  useProductSelectors
} from './app/services/redux/ducks/Products.duck';
import {Main} from './app/Main';

/**
 * Application logic starts here
 * Here we make initial loading of necessary data right before start business logic
 */
const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(() => (
    <InitialLoadingPage />
  ));
  const dispatch = useDispatch();
  const {productsSelector, productLoadingStateSelector} = useProductSelectors();

  /** Sends product request or shows main page */
  useEffect(() => {
    if (isLoaded) {
      setCurrentComponent(<Main productsCustom={productsSelector.toArray()} />);
    } else {
      dispatch(actionProductsRequest());
    }
    // return () => console.log('App unloaded...');
  }, [isLoaded]);

  /** switches main page view depend on product loading state  */
  useEffect(() => {
    switch (productLoadingStateSelector) {
      case ProductLoadingState.isLoading:
        setCurrentComponent(<InitialLoadingPage />);
        break;
      case ProductLoadingState.error:
        setCurrentComponent(<InitialLoadingPage isError={true} />);
        break;
      default:
        // success
        break;
    }
  }, [productLoadingStateSelector]);

  /** Tracks moment when all products are loaded */
  useEffect(() => {
    if (productsSelector.count() > 0 && !isLoaded) {
      setIsLoaded(true);
    }
  }, [productsSelector]);

  return currentComponent;
};
export default App;
