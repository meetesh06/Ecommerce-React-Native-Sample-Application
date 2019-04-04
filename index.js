import { Navigation } from "react-native-navigation";
import Initializing from "./screens/Initializing";
import CustomerLogin from "./screens/CustomerLogin";
import SellerLogin from "./screens/SellerLogin";

import CustomerHome from './screens/CustomerHome';
import CustomerSearch from './screens/CustomerSearch';
import CustomerProfile from './screens/CustomerProfile';
import ProductDetail from './screens/ProductDetail';

import SellerHome from './screens/SellerHome';
import CreateProduct from './screens/CreateProduct';

Navigation.registerComponent(`navigation.root.initializing`, () => Initializing);
Navigation.registerComponent(`navigation.root.customerLogin`, () => CustomerLogin);
Navigation.registerComponent(`navigation.root.sellerLogin`, () => SellerLogin);

Navigation.registerComponent(`navigation.customer.customerHome`, () => CustomerHome);
Navigation.registerComponent(`navigation.customer.customerSearch`, () => CustomerSearch);
Navigation.registerComponent(`navigation.customer.customerProfile`, () => CustomerProfile);
Navigation.registerComponent(`navigation.customer.productDetail`, () => ProductDetail);

Navigation.registerComponent(`navigation.seller.sellerHome`, () => SellerHome);
Navigation.registerComponent(`navigation.seller.createProduct`, () => CreateProduct);

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