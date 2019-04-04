import React, {Component} from 'react';
import { AsyncStorage, SafeAreaView, Alert, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

const dummyLoginData = {
  'test1@gmail.com': {
    password: 'hellouser1',
    name: 'Seller Shop 1'
  },
  'test2@gmail.com': {
    password: 'hellouser2',
    name: 'Seller Shop 2'
  },
}

export default class App extends Component {
  state = {
    email: '',
    password: ''
  }
  handleLogin = async () => {
    // Check credentials with server here
    const {
      email
    } = this.state;
    if(dummyLoginData[email] && dummyLoginData[email].password === this.state.password) {
      try {
        await AsyncStorage.setItem('LOGGED_IN', 'true');
        await AsyncStorage.setItem('LOGGED_IN_TYPE', JSON.stringify({
          name: dummyLoginData[email].password,
          email: email
        }));
        Navigation.setRoot({
          root: {
            stack: {
              
              children: [{
                component: {
                  name: "navigation.seller.sellerHome",
                  passProps: {
                    name: dummyLoginData[email].password,
                    email: email
                  }
                },
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
      } catch (error) {
      }
      
    } else {
      Alert.alert('Invalid email/password');
      this.setState({
        password: ''
      })
    }
  }
  render() {
    return (
      <SafeAreaView
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
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <TextInput
            style={{
              backgroundColor: '#f0f0f0',
              margin: 10,
              padding: 15,
              borderRadius: 10,
            }}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Email Address"
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            style={{
              backgroundColor: '#f0f0f0',
              margin: 10,
              padding: 15,
              borderRadius: 10,
            }}
            autoComplete="password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
          />
          
        </View>
        <TouchableOpacity
          onPress={this.handleLogin}
          style={{
            backgroundColor: '#ff8400',
            width: 150,
            padding: 10,
            margin: 10,
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
      </SafeAreaView>
    );
  }
}

