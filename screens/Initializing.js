import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Navigation } from "react-native-navigation";
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export const goHome = async () => {
  const homeIcon = await Icon1.getImageSource('home', 22);
  const searchIcon = await Icon2.getImageSource('search', 22);
  const profileIcon = await Icon2.getImageSource('person', 22);
  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'customer_bottom_stack',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        },
        children: [
          {
            stack: {
              id: 'customer_home_stack',
              options: {
                bottomTab: {
                  fontSize: 10,
                  selectedFontSize: 12,
                  text: 'Home',
                  icon: homeIcon,
                  iconColor: '#c0c0c0',
                  textColor: '#c0c0c0',
                  selectedTextColor: '#FF6A15',
                  selectedIconColor: '#FF6A15'
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              },
              children: [
                {
                  component: {
                    id: 'customer_home',
                    name: 'navigation.customer.customerHome'
                  }
                }
              ]
            }
          },
          {
            stack: {
              id: 'customer_search_stack',
              options: {
                bottomTab: {
                  fontSize: 10,
                  selectedFontSize: 12,
                  text: 'Search',
                  icon: searchIcon,
                  iconColor: '#c0c0c0',
                  textColor: '#c0c0c0',
                  selectedTextColor: '#FF6A15',
                  selectedIconColor: '#FF6A15'
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    id: 'customer_search',
                    name: 'navigation.customer.customerSearch'
                  }
                }
              ]
            }
          },
          {
            stack: {
              id: 'customer_profile_stack',
              options: {
                bottomTab: {
                  fontSize: 10,
                  selectedFontSize: 12,
                  text: 'Profile',
                  icon: profileIcon,
                  iconColor: '#c0c0c0',
                  textColor: '#c0c0c0',
                  selectedTextColor: '#FF6A15',
                  selectedIconColor: '#FF6A15'
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              },
              children: [
                {
                  component: {
                    id: 'customer_profile',
                    name: 'navigation.customer.customerProfile'
                  }
                }
              ]
            }
          }
        ],
      }
    }
  });
};

export default class App extends Component {
  async componentDidMount() {
    try {
      const logged_in = await AsyncStorage.getItem('LOGGED_IN');
      const type = await AsyncStorage.getItem('LOGGED_IN_TYPE');
      console.log(logged_in, type);
      if (logged_in === null) {
        this.setState({
          loading: false
        })
      } else if ( type == 'CUSTOMER' ){
        goHome();
      } else {
        Navigation.setRoot({
          root: {
            stack: {
              children: [{
                component: {
                  name: "navigation.seller.sellerHome",
                  passProps: {
                    ...JSON.parse(type)
                  }
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
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  state = {
    loading: true
  }

  handleCustomerLogin = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.root.customerLogin',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  handleSellerLogin = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.root.sellerLogin',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Image blurRadius={10} source={require('../media/init_back.jpg')} style={{
          flex: 1,
          resizeMode: 'cover',
          position: 'absolute'
        }} />
        <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <Image style={{ alignSelf: 'center', width: 100, height: 100 }} source={require('../media/logo.png')} />
            <Text style={{ textAlign: 'center', color: '#fff', margin: 5 }}>INTERNSHIP APPLICATION</Text>
        </View>
        {
          this.state.loading &&
          <ActivityIndicator style={{ flex: 2 }} size="large" color="#ffffff" />
        }
        {!this.state.loading &&
          <View style={{
              flex: 2,
              backgroundColor: '#ffffff99'
          }}>
            <Text style={{ textAlign: 'center', margin: 10 }}>Login as</Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={
                  this.handleCustomerLogin
                }
                style={{
                  height: 50,
                  margin: 10,
                  backgroundColor: '#fff',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ textAlign: 'center' }}>Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  this.handleSellerLogin
                }
                style={{
                  // height: 50,
                  marginTop: 30,
                  // backgroundColor: '#fff',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: '#333', textAlign: 'center' }}>Login as a Seller ?</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', fontSize: 10, marginBottom: 20 }}>Created By Meetesh Mehta</Text>
          </View>
        }
        
        
        
      </View>
    );
  }
}

