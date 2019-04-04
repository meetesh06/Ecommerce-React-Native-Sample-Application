import React, {Component} from 'react';
import { AsyncStorage, Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff'
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
            Create a new product
          </Text>
        </View>
        <ScrollView
          style={{
            flex: 1
          }}
        >
        </ScrollView>
      </SafeAreaView>
    );
  }
}

