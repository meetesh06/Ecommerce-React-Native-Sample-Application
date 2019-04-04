import React, {Component} from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from "react-native-navigation";

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
  handleLogin = async () => {
    try {
      await AsyncStorage.setItem('LOGGED_IN', 'true');
      await AsyncStorage.setItem('LOGGED_IN_TYPE', 'CUSTOMER');
      goHome();
    } catch (error) {
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          color: '#fff'
        }}
      >
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            color: '#222',
            textAlign: 'center'
          }}
        >
            Welcome to iA
        </Text>
        <Text
          style={{
            color: '#444',
            textAlign: 'center',
            margin: 10
          }}
        >
          Please Login to continue
        </Text>
        <View
          style={{
            // flex: 1,
            marginTop: 50,
            marginBottom: 50,
            padding: 15,
            justifyContent: 'center',
            margin: 15,
            backgroundColor: '#f0f0f0',
            borderRadius: 10
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: '#a0a0a0',
              fontSize: 20
            }}
          >
            For the purposes of this demo you will be logged in as Sample User.
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.handleLogin}
          style={{
            backgroundColor: '#ff8400',
            width: 150,
            padding: 10,
            alignSelf: 'center',
            borderColor: '#ff9f39',
            borderWidth: 4,
            borderRadius: 50
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              textAlign: 'center',
              fontSize: 18
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

