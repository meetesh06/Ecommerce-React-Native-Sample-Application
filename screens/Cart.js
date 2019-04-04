import React, {Component} from 'react';
import { TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';

export default class App extends Component {
  state = {
    media: {},
    name: '',
    description: '',
    price: ''
  }

  componentDidMount() {
    Realm.getRealm((realm) => {
      let product = realm.objects('Products').filtered(`_id = "${this.props._id}"`);
      this.setState({
        media: JSON.parse(product[0].media),
        name: product[0].name,
        description: product[0].description,
        price: product[0].price,
      })
      console.log(product[0]);
    });
  }
  
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
          <TouchableOpacity
            onPress={
              () => Navigation.pop(this.props.componentId)
            }
            style={{
              alignSelf: 'center',
              marginLeft: 10,
              flexDirection: 'row'
            }}
          >
            <AntDesign name="left" size={25} style={{ color: '#ff8400'  }} />
            
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 15,
              // fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginRight: 10,
              flexDirection: 'row'
            }}
          >
            <EvilIcons name="cart" size={30} style={{ color: '#ff8400'  }} />
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#f0f0f0',
                padding: 4,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  justifyContent: 'center',
                  color: '#ff8400'
                }}
              >
                10
              </Text>

            </View>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    );
  }
}

