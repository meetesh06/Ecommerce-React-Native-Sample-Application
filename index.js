import React from 'react';
import { Navigation } from "react-native-navigation";
import Initializing from "./screens/Initializing";
import CustomerLogin from "./screens/CustomerLogin";
import SellerLogin from "./screens/SellerLogin";

import CustomerHome from './screens/CustomerHome';
import CustomerSearch from './screens/CustomerSearch';
import CustomerProfile from './screens/CustomerProfile';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';

import SellerHome from './screens/SellerHome';
import CreateProduct from './screens/CreateProduct';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './screens/helpers/cartReducer';
import PaymentScreen from './screens/PaymentScreen';

import EditProduct from './screens/EditProduct';

export const store = createStore(reducer);

function reduxStoreWrapper (MyComponent, store) {
  return () => {
      return class StoreWrapper extends React.Component {
          render () {
              return (
                  <Provider store={store}>
                      <MyComponent />
                  </Provider>
              );
          }
      };
  };
}

Navigation.registerComponent(`navigation.root.initializing`, () => Initializing);
Navigation.registerComponent(`navigation.root.customerLogin`, () => CustomerLogin);
Navigation.registerComponent(`navigation.root.sellerLogin`, () => SellerLogin);

Navigation.registerComponent(`navigation.customer.customerHome`,
() => (props) => (
  <Provider store={store}>
    <CustomerHome {...props} />
  </Provider>
));
// Navigation.registerComponent(`navigation.customer.customerHome`, reduxStoreWrapper(CustomerHome, store), () => CustomerHome);
Navigation.registerComponent(`navigation.customer.customerSearch`, () => CustomerSearch);
Navigation.registerComponent(`navigation.customer.customerProfile`, () => CustomerProfile);
Navigation.registerComponent(`navigation.customer.customerProfile`,
() => (props) => (
  <Provider store={store}>
    <CustomerProfile {...props} />
  </Provider>
));
Navigation.registerComponent(`navigation.customer.productDetail`,
() => (props) => (
  <Provider store={store}>
    <ProductDetail {...props} />
  </Provider>
));
Navigation.registerComponent(`navigation.customer.cart`,
() => (props) => (
  <Provider store={store}>
    <Cart {...props} />
  </Provider>
));
Navigation.registerComponent(`navigation.customer.paymentScreen`,
() => (props) => (
  <Provider store={store}>
    <PaymentScreen {...props} />
  </Provider>
));

// Navigation.registerComponent(`navigation.customer.productDetail`, reduxStoreWrapper(ProductDetail, store), () => ProductDetail);

Navigation.registerComponent(`navigation.seller.sellerHome`, () => SellerHome);
Navigation.registerComponent(`navigation.seller.createProduct`, () => CreateProduct);
Navigation.registerComponent(`navigation.seller.editProduct`, () => EditProduct);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "navigation.root.initializing"
          }
        }],
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }
  });
});