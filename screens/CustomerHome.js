import React, {Component} from 'react';
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Realm from '../realm';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';

class CustomerHome extends Component {
  processRealmObj = (RealmObject, callback) => {
    const result = Object.keys(RealmObject).map(key => ({ ...RealmObject[key] }));
    callback(result);
  }

  state = {
    shops: [],
    final: {}
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
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    });
    let final = {};
    let shops = [];
    Realm.getRealm((realm) => {
      let products = realm.objects('Products').sorted('timestamp', true);
      this.processRealmObj( products, (result) => {
        result.forEach((product) => {
          if(!final[product.shop_name]) {
            shops.push(product.shop_name);
            final[product.shop_name] = [product];
          } else {
            final[product.shop_name].push(product);
          }
        })
      });
      this.setState({ final, shops });
    });
    
  }

  componentDidMount() {
    console.log(this.props);
    this._onRefresh();
  }

  handleProductDetail = (_id) => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'product_detail',
        name: 'navigation.customer.productDetail',
        passProps: {
          _id
        },
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          },
          bottomTabs: {
            animate: true,
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {/* Header */}
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
        <View
          style={{
            height: 200
          }}
        >

          <Swiper
            autoplay={true}
            showsButtons={false}
            dotColor="#f0f0f0ee"
            activeDotColor="#c0c0c0ee"
          >
            <View style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#97CAE5',
            }}>
              <Image
                style={{
                  width: '100%',
                  height: 200
                }}
                blurRadius={20}
                resizeMode="cover"
                source={require('../media/slider1.jpg')}
              />
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                The best textiles you can buy
              </Text>
            </View>
              <Image
                style={{
                  width: '100%',
                  height: 200
                }}
                // blurRadius={10}
                resizeMode="cover"
                resizeMethod="resize"
                source={require('../media/slider2.jpg')}
              />
          </Swiper>
        </View>
        {
          this.state.shops.map((value) => {
            return <View>
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '500'
                }}
              >
                {value}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#555'
                  }}
                >
                  Visit Shop <AntDesign name="right" />
                </Text>
              </TouchableOpacity>
            </View>
  
            <FlatList
              keyExtractor={(val, index) => index}
              horizontal
              data={this.state.final[value]}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => 
                <TouchableOpacity
                  onPress={() => this.handleProductDetail(item._id)}
                  style={{
                    width: 150,
                    height: 250,
                    margin: 10,
                    borderRadius: 10,
                    // backgroundColor: 'red'
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 150,
                      backgroundColor: '#fff',
                      height: 200
                    }}
                    source={JSON.parse(item.media)}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 15,
                        margin: 5,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      Rs. {item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>
          })
        }

        
        <View>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '500'
              }}
            >
              This is a demo shop
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginRight: 10,
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#555'
                }}
              >
                Visit Shop <AntDesign name="right" />
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[{key: 'a'}, {key: 'b'}, { key: 'c' }]}
            renderItem={({item}) => 
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 250,
                  margin: 10,
                  borderRadius: 10,
                  // backgroundColor: 'red'
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 150,
                    backgroundColor: '#fff',
                    height: 200
                  }}
                  source={require('../media/demoProduct.jpg')}
                />
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 15,
                      margin: 5,
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    This is demo
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    $15.25
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
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
    addToCart: (item) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: item
      })
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);