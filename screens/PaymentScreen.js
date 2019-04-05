import React, {Component} from 'react';
import { TextInput, Image, Alert, TouchableOpacity, Text, SafeAreaView, View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';

class PaymentScreen extends Component {
  state = {
    keys: [],
    price: 0,
    selected: 0
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

  completePayment = () => {
    let keys = this.state.keys;
    let paymentDetails = {
      name: 'Demo User',
      email: 'demo@meetesh.com',
      timestamp: new Date()
    };
    switch(this.state.selected) {
      case 0:
        paymentDetails.paymentType = "Wallet";
        break;
      case 1:
        paymentDetails.paymentType = "Card";
        break;
      case 2:
        paymentDetails.paymentType = "COD";
        break;
    }
    
    Realm.getRealm((realm) => {
      keys.forEach((val) => {
        let product = realm.objects('Products').filtered(`_id="${val}"`);
        let sales = JSON.parse(product[0].sales);
        sales.push(paymentDetails);
        realm.write(() => {
          realm.create('Products', {_id: val, sales: JSON.stringify(sales)}, true);
        });
      })
      Navigation.popToRoot(this.props.componentId);
      this.props.completeOrder();
      Alert.alert('order completed successfully');
    })
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
            Choose Payment Method
          </Text>
          
        </View>
        <ScrollView>
            
            <TouchableOpacity
              onPress={
                () => this.setState({ selected: 0 })
              }
              style={{
                height: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                flex: 1,
                backgroundColor: this.state.selected === 0 ? '#c0c0c0':'#f0f0f0',
                margin: 10,
                borderRadius: 10
              }}
            >
              <AntDesign name="wallet" size={35} style={{ color: '#333', alignSelf: 'center' }} />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 20,
                  fontSize: 20
                }}
              >
                Pay Using Wallet
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={
                () => this.setState({ selected: 1 })
              }
              style={{
                height: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                flex: 1,
                backgroundColor: this.state.selected === 1 ? '#c0c0c0':'#f0f0f0',
                margin: 10,
                borderRadius: 10
              }}
            >
              <Ionicons name="ios-cash" size={35} style={{ color: '#333', alignSelf: 'center' }} />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 20,
                  fontSize: 20
                }}
              >
                Pay Using Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={
                () => this.setState({ selected: 2 })
              }
              style={{
                height: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                flex: 1,
                backgroundColor: this.state.selected === 2 ? '#c0c0c0':'#f0f0f0',
                margin: 10,
                borderRadius: 10
              }}
            >
              <AntDesign name="wallet" size={35} style={{ color: '#333', alignSelf: 'center' }} />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 20,
                  fontSize: 20
                }}
              >
                Pay Using COD
              </Text>
            </TouchableOpacity>
            

            <Text
              style={{
                margin: 10,
                textAlign: 'center',
                color: '#909090'
              }}
            >
              You will complete payment for {this.state.keys.length} items with total price of Rs. {this.state.price}
            </Text>
            {/* {
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
                      <Image source={this.props.cart[val].media} style={{ borderRadius: 10, width: 100, height: 100, margin: 5 }} resizeMode="cover"/>
                      <View
                        style={{
                          flex: 1,
                          margin: 5,
                          paddingTop: 20
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold'
                          }}
                        >
                        {this.props.cart[val].name}

                        </Text>
                        
                        <Text
                          style={{
                            fontSize: 18,
                            // fontWeight: 'bold'
                          }}
                        >
                        Rs. {this.props.cart[val].price}

                        </Text>
                        
                      </View>
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
                    </View>
                  );
                }
              )
            } */}
        </ScrollView>
        <TouchableOpacity
          onPress={this.completePayment}
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
            Make Payment of Rs. {this.state.price}
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
    completeOrder: () => {
      dispatch({
        type: 'COMPLETE_PAYMENT',
        payload: {}
      })
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);