import React, {Component} from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SearchBar from 'react-native-searchbar';

const items = [
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];

export default class App extends Component {
  componentDidMount() {
    this.searchBar.hide();
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
            Textile Application
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
          <TouchableOpacity
            onPress={() => this.searchBar.show()}
            style={{
              alignSelf: 'center',
              marginRight: 10,
              flexDirection: 'row'
            }}
          >
            <EvilIcons name="search" size={30} style={{ color: '#ff8400'  }} />
          </TouchableOpacity>
        </View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={[]}
          heightAdjust={10}
          placeholder="Demo Search"
          // hideBack={true}
          // handleResults={this._handleResults}
          showOnLoad
        />

        <View
          style={{
            flex: 1,            
            marginTop: 10
          }}
        >
          <Text
            style={{
              margin: 15,
              color: '#444'
            }}
          >
            This is a demo page, search functionality is not available this this demo application
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

