import React, {Component} from 'react';
import { AsyncStorage, Text, SafeAreaView, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';

class CustomerProfile extends Component {

  handleLogout = async () => {
    await AsyncStorage.removeItem('LOGGED_IN');
    await AsyncStorage.removeItem('LOGGED_IN_TYPE');
    this.props.logout();
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: "navigation.root.initializing"
              // name: "navigation.customer.customerHome"
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

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 50,
            // backgroundColor: '#FF6A15',
            flexDirection: 'row',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            
            elevation: 1            
          }}
        >
          <Text
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            Textile Application
          </Text>
          <TouchableOpacity
            onPress={this.handleLogout}
            style={{
              alignSelf: 'center',
              marginRight: 10,
              flexDirection: 'row'
            }}
          >
            <MaterialIcons name="exit-to-app" size={30} style={{ color: '#ff8400'  }} />
            
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <MaterialIcons name="person" size={150} style={{ alignSelf: 'center', color: '#d0d0d0' }} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold'
            }}
          >
            Hello Demo User
          </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f0f0f0',
              // padding: 15,
              marginTop: 50,
              marginBottom: 50,
              borderRadius: 10,
              // minHeight: 200,
              margin: 10,
              justifyContent: 'center'
            }}
          >
            <MaterialIcons style={{ color: '#a0a0a0', alignSelf: 'center', marginTop: 15 }} size={40} name="info-outline" />
            <Text
              style={{
                color: '#444',
                fontSize: 16,
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 25,
                textAlign: 'center'
              }}
            >
              
              Thank you for installing this demo application, this has been made for internship application by Meetesh Mehta
            </Text>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}



function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

const mapDispatchToProps = dispatch => (
  {
    logout: (item) => {
      dispatch({
        type: 'LOGOUT',
        payload: item
      })
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
// export default CustomerProfile;