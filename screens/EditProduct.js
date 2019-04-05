import React, {Component} from 'react';
import { FlatList, TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
    price: '',
    sales: []
  }

  componentDidMount() {
    const data = {
      source: JSON.parse(this.props.item.media),
      name: this.props.item.name,
      description: this.props.item.description,
      price: this.props.item.price,
      sales: JSON.parse(this.props.item.sales)
    }
    this.setState({...data});

  }
  
  updateProduct = () => {
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
      _id: this.props.item._id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      media: JSON.stringify(this.state.source),
      timestamp: new Date()
    };
    Realm.getRealm((realm)=>{
      realm.write(() => {
        try {
          realm.create('Products', product, true);
        } catch (e) {
          Alert.alert(JSON.stringify(e));
        } finally {
          Navigation.popToRoot(componentId);
        }
      });
    });
  }

  openPicker = () => {    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
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
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            {/* Edit a product */}
          </Text>
          <TouchableOpacity
            onPress={this.updateProduct}
            style={{
              justifyContent: 'center',
              marginRight: 10
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                color: '#ff8400'
              }}
            >
              Done
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
            value={this.state.name}
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
            value={this.state.description}
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
            value={this.state.price}
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10
            }}
          >
            Sales
          </Text>
          <FlatList  
            data={this.state.sales}
            horizontal
            style={{
              margin: 10
            }}
            renderItem={({item}) => 
              <TouchableOpacity
                style={{
                  // flex: 1,
                  // justifyContent: 'center',
                  // margin: 10,
                  width: 200,
                  // height: 150,
                  borderRadius: 10,
                  padding: 15,
                  backgroundColor: '#e0e0e0'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15
                  }}
                >
                  {item.email}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12
                  }}
                >
                  {item.timestamp}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    fontWeight: 'bold'
                  }}
                >
                  Paid Using {item.paymentType}
                </Text>
                
                
              </TouchableOpacity>
            }
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

