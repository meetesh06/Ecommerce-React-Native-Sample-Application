import React, {Component} from 'react';
import { TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';

const options = {
  title: 'Select a image for product',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class App extends Component {
  state = {
    source: '',
    name: '',
    description: '',
    price: ''
  }

  makeid = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

  createProduct = () => {
    const componentId = this.props.componentId;
    if(this.state.source === "") {
      return Alert.alert("Please select an image");
    }
    if(this.state.name === "") {
      return Alert.alert("Invalid Name");
    }
    if(this.state.description === "") {
      return Alert.alert("Invalid Description");
    }
    if(this.state.price === "") {
      return Alert.alert("Invalid Price");
    }
    const product = {
      _id: this.makeid(10),
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      seller_email: this.props.email,
      shop_name: this.props.name  ,
      media: JSON.stringify(this.state.source),
      sales: JSON.stringify([]),
      timestamp: new Date()
    };
    Realm.getRealm((realm)=>{
      realm.write(() => {
        try {
          realm.create('Products', product);
        } catch (e) {
          Alert.alert(JSON.stringify(e));
        } finally {
          Navigation.popToRoot(componentId);
        }
      });
    });
  }

  openPicker = () => {    
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      // Alert.alert(JSON.stringify(response));
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // Alert.alert(JSON.stringify(source));
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          source
        });
      }
    });
  }
  
  render() {
    const {
      source
    } = this.state;
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
          <TouchableOpacity
            onPress={this.createProduct}
            style={{
              justifyContent: 'center',
              marginRight: 10
            }}
          >
            <Text
              style={{
                alignSelf: 'center'
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView>
          <TouchableOpacity
            onPress={this.openPicker}
            style={{
              backgroundColor: '#f0f0f0',
              alignSelf: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 250,
            }}
          >
            {
              this.state.source === "" && <MaterialIcons name="photo-library" size={35} style={{ color: '#c0c0c0', alignSelf: 'center' }} />
            }
            {
              this.state.source !== "" && 
              <Image
                source={source}
                style={{
                  width: '100%',
                  height: 250,
                  resizeMode: 'contain',
                  position: 'absolute'
                }}
              />
            }
          </TouchableOpacity>
          <TextInput
            style={{
              backgroundColor: '#f0f0f0',
              margin: 10,
              padding: 15,
              borderRadius: 10,
            }}
            autoCapitalize="none"
            placeholder="Product Name"
            onChangeText={(name) => this.setState({name})}
          />
          <TextInput
            multiline
            numberOfLines={3}
            style={{
              // justifyContent: 'flex-start',
              backgroundColor: '#f0f0f0',
              margin: 10,
              padding: 15,
              // padding: 15,
              // minHeight: 150,
              borderRadius: 10,
            }}
            autoCapitalize="none"
            placeholder="Product Description"
            onChangeText={(description) => this.setState({description})}
          />
          <TextInput
            style={{
              backgroundColor: '#f0f0f0',
              margin: 10,
              padding: 15,
              borderRadius: 10,
            }}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Product Price"
            onChangeText={(price) => this.setState({price})}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

