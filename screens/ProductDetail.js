import React, {Component} from 'react';
import { TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';

class ProductDetail extends Component {
  state = {
    media: {},
    name: '',
    description: '',
    price: '',
    added: false
  }

  handleCartOpen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'cart',
        name: 'navigation.customer.cart',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          },
          bottomTabs: {
            animate: true,
            visible: false
          }
        }
      }
    });
  }

  handleCart = () => {
    const alreadyInCart = this.props.cart[this.props._id] !== undefined;
    if(alreadyInCart) {
      this.props.removeFromCart(this.props._id)
    } else {
      this.props.addToCart({
        ...this.state, _id: this.props._id
      })
    }
  }

  componentDidMount() {
    Realm.getRealm((realm) => {
      console.log(this.props);
      let product = realm.objects('Products').filtered(`_id = "${this.props._id}"`);
      this.setState({
        media: JSON.parse(product[0].media),
        name: product[0].name,
        description: product[0].description,
        price: product[0].price,
      })
      
    });
  }
  
  render() {
    const alreadyInCart = this.props.cart[this.props._id] !== undefined;
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
            onPress={this.handleCartOpen}
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
                width: 25,
                justifyContent: 'center',
                height: 25,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#ff8400'
                }}
              >
                {Object.keys(this.props.cart).length}
              </Text>

            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Image
            source={this.state.media}
            resizeMode="contain"
            style={{
              width: '100%',
              height: 300,
              backgroundColor: '#f0f0f0'
            }}
          />

          <Text
            numberOfLines={1}
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              margin: 5
            }}
          >
            {this.state.name}
          </Text>
          <Text
            style={{
              minHeight: 150,
              fontSize: 15,
              margin: 5,
              padding: 10,
              backgroundColor: '#f0f0f0'
            }}
          >
            {this.state.description}
          </Text>

        </ScrollView> 
        <TouchableOpacity
          onPress={this.handleCart}
          style={{
            position: 'absolute',
            backgroundColor: this.props.cart[this.props._id] !== undefined ? '#c0c0c0' : '#ff8400',
            width: '100%',
            padding: 20,
            bottom: 0
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              // fontWeight: 'bold',
              fontSize: 20
            }}
          >
            {
              alreadyInCart && "Remove from cart"
            }
            {
              !alreadyInCart && `Add to Cart ( Rs. ${this.state.price} )`
            }
            
          </Text>
        </TouchableOpacity>
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
    addToCart: (item) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: item
      })
    },
    removeFromCart: (_id) => {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: _id
      })
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
// export default ProductDetail;