import React, {Component} from 'react';
import { Alert, RefreshControl, Image, FlatList, AsyncStorage, Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import Realm from '../realm';

export default class App extends Component {
  state = {
    products: [],
    refreshing: false
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    });
    Realm.getRealm((realm) => {
      let products = realm.objects('Products').sorted('timestamp', true);
      this.setState({
        products,
        refreshing: false
      })
      
    });
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this._onRefresh();
  }

  handleLogout = async () => {
    await AsyncStorage.removeItem('LOGGED_IN');
    await AsyncStorage.removeItem('LOGGED_IN_TYPE');
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

  handleDelete = () => {
    Realm.getRealm((realm) => {
      let products = realm.objects('Products');
      realm.write(() => {
        realm.delete(products);
        this.setState({ products: [] })
      });
    });
  }
  handleProductCreation = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'createProductPage',
        name: 'navigation.seller.createProduct',
        passProps: {
          email: this.props.email,
          name: this.props.name
        },
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  componentDidAppear() {
    this._onRefresh();
  }

  handleProductOpen = (item) => {
    Alert.alert(JSON.stringify(JSON.parse(item.sales)))
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
            Hello {this.props.name}
          </Text>
          <TouchableOpacity
            onPress={this.handleDelete}
            style={{
              alignSelf: 'center',
              marginRight: 10,
              flexDirection: 'row'
            }}
          >
            <MaterialIcons name="delete" size={30} style={{ color: '#ff8400'  }} />
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={this.handleProductCreation}
            style={{
              alignSelf: 'center',
              marginRight: 10,
              flexDirection: 'row'
            }}
          >
            <MaterialIcons name="add-shopping-cart" size={30} style={{ color: '#ff8400'  }} />
          </TouchableOpacity>
          
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={{
            flex: 1
          }}
        >
          { this.state.products.length === 0 && <View>
            <MaterialIcons name="person" size={150} style={{ alignSelf: 'center', color: '#d0d0d0' }} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold'
            }}
          >
            Welcome seller, create a product to start selling.
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
              
              This page will show the product sales and other options, for the purpose of demo placeholders have been used.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 10
              }}
            >
              Logged in as {this.props.email}
            </Text>
          </View>
          </View>}
          <FlatList
            
            data={this.state.products}
            renderItem={({item}) => 
              <TouchableOpacity
                onPress={() => this.handleProductOpen(item)}
                style={{
                  flex: 1,
                  // justifyContent: 'center',
                  margin: 10,
                  // borderRadius: 10,
                  // backgroundColor: 'red'
                }}
              >
                <Text>
                  {/* {JSON.stringify(JSON.parse(item.media).uri)} */}
                </Text>
                <View>
                  <Image
                    // blurRadius={10}
                    resizeMode="cover"
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#f0f0f0',
                      height: 200
                    }}
                    source={JSON.parse(item.media)}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#ffffffaa',
                      padding: 10,
                      borderRadius: 10,
                      bottom: 20,
                      right: 20
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 15,
                        margin: 5,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Sales
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      {JSON.stringify(JSON.parse(item.sales).length)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    // position: 'absolute',
                    backgroundColor: '#ffffffaa',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 20,
                      margin: 5,
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      margin: 5,
                    }}
                  >
                    Rs. {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

