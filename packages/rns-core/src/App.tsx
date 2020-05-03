import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';

import {NavigationStackParamList} from './app/models/navigation';
import {ProductLoadingState} from './app/models/Product/ProductModels';
import {InitialLoadingScreen} from './app/views/InitialLoadingScreen';
import {
  actionProductsRequest,
  useProductSelectors
} from './app/services/redux/ducks/Products.duck';
import {MainScreen} from './app/Main';

/**
 * Application logic starts here
 * Here we make initial loading of necessary data right before start business logic
 *
 * @returns {React.FC} Component with the main application logic
 */
const App: React.FC = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingError, setLoadedingState] = useState(false);
  const {productsSelector, productLoadingStateSelector} = useProductSelectors();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const NavigationStack = createStackNavigator<NavigationStackParamList>();

  /** Sends product request or shows main page */
  useEffect(() => {
    if (isLoaded) {
      navigation.navigate('MainScreen');
    } else {
      dispatch(actionProductsRequest());
    }
    // return () => console.log('App unloaded...');
  }, [dispatch, isLoaded, navigation]);

  /** switches main page screen depending on product loading state  */
  useEffect(() => {
    switch (productLoadingStateSelector) {
      case ProductLoadingState.isLoading:
        setLoadedingState(true);
        break;
      case ProductLoadingState.error:
        setLoadedingState(false);
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
  }, [isLoaded, productsSelector]);

  return (
    <NavigationStack.Navigator headerMode="none">
      {!isLoaded && (
        <NavigationStack.Screen
          name="Loading"
          component={InitialLoadingScreen}
          options={{title: 'Loading...'}}
          initialParams={{isError: isLoadingError}}
        />
      )}
      <NavigationStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{title: 'Main Screen'}}
        initialParams={{products: productsSelector.toArray()}}
      />
      <NavigationStack.Screen
        name="ProductPage"
        component={MainScreen}
        options={{title: 'Product Page'}}
        initialParams={{products: productsSelector.toArray()}}
      />
    </NavigationStack.Navigator>
  );
};
export default App;
