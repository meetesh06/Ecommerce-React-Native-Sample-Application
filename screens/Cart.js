import React, {Component} from 'react';
import { TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';

class Cart extends Component {
  state = {
    keys: [],
    price: 0
  }
  componentDidMount() {
    let keys = [];
    let price = 0;
    Object.entries(this.props.cart).forEach(
      (key, val) => {
        price += parseInt(key[1].price);
        keys.push(key[0]);
      }
    );
    this.setState({ keys, price });
  }

  handleCart = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.customer.paymentScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          },
          bottomTabs: {
            visible: false,
            animate: true
          }
        }
      }
    });
  }

  updateKeysAndPrice = () => {
    let keys = [];
    let price = 0;
    Object.entries(this.props.cart).forEach(
      (key, val) => {
        price += parseInt(key[1].price);
        keys.push(key[0]);
      }
    );
    this.setState({ keys, price });
  }

  generateItems = () => {
    Object.entries(this.props.cart).forEach(
      ([key, value]) => <View>
        <Text>
          {JSON.stringify(value)}
        </Text>
      </View>
    )
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
              textAlign: 'left',
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            Your Shopping Cart
          </Text>
          
        </View>
        <ScrollView>

            {
              this.state.keys.map((val, index) => {
                  // if(this.props.cart[val] === undefined) return
                  return (
                    <View
                      style={{
                        margin: 10,
                        borderRadius: 10,
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row'
                      }}
                    >
                      {
                        this.props.cart[val] && this.props.cart[val].media && <Image source={this.props.cart[val].media} style={{ borderRadius: 10, width: 100, height: 100, margin: 5 }} resizeMode="cover"/>
                      }
                      <View
                        style={{
                          flex: 1,
                          margin: 5,
                          paddingTop: 20
                        }}
                      >
                        {
                          this.props.cart[val] && this.props.cart[val].name &&
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold'
                            }}
                          >
                          {this.props.cart[val].name}
                          </Text>
                        }
                        
                        {
                          this.props.cart[val] && this.props.cart[val].price &&
                          <Text
                            style={{
                              fontSize: 18,
                              // fontWeight: 'bold'
                            }}
                          >
                          
                          Rs. {this.props.cart[val].price}

                          </Text>
                        }
                        
                      </View>
                      {
                          this.props.cart[val] && this.props.cart[val].price &&
                        <View
                          style={{
                            justifyContent: 'center'
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              const new_val = this.state.keys;
                              let price = this.state.price;
                              price -= parseInt(this.props.cart[val].price);
                              delete new_val[index];
                              this.setState({
                                keys: new_val,
                                price
                              }, () => {
                                this.props.removeFromCart(val)
                              });
                              }
                            }
                          >
                            <AntDesign name="closecircle" size={20} style={{ marginRight: 10, color: '#909090' }} />
                          </TouchableOpacity>
                        </View>
                      }
                    </View>
                  );
                }
              )
            }
        </ScrollView>
        <TouchableOpacity
          onPress={this.handleCart}
          style={{
            position: 'absolute',
            backgroundColor: '#ff8400',
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
            Total Amount: Rs. {this.state.price}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);