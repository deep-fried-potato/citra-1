import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Text, AsyncStorage, PermissionsAndroid, Linking, Platform} from 'react-native';
import {Container, Button, Content} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Banner from '../../components/banner';
import styles from './styles';
import session from "../../api/session";

const icons = [
    {name: 'Fire', icon: 'md-flame'},
    {name: 'Garbage', icon: 'md-pint'},
    {name: 'Water', icon: 'md-water'},
    {name: 'Pests', icon: 'md-bug'},
];

const markers = [
    {
        latitude: 13.5568,
        longitude: 80.0261
    },
    {
        latitude: 13.5481,
        longitude: 80.0002
    }
];

const getPosition = (options) => {
    return new Promise((resolve, reject) => {
        Geolocation.watchPosition(resolve, reject, options);
    })
};

const locationOptions = {enableHighAccuracy: true, timeout: 200000, maximumAge: 0};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 13.5568,
        longitude: 80.0261,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
      markers: [],
      error: null,
    };
  }

  _getCurrentPositionAsync = () => {
    return new Promise(function (resolve, reject) {
        Geolocation.getCurrentPosition(resolve, reject);
    }).then((position) => {
        return position;
    })
        .catch((err) => {
            console.log(err);
        });
}

_setCurrentLocation = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You are accessing the location');
            let position = await this._getCurrentPositionAsync();
            console.log(position)
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            })
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

getMarkers = () => {
  AsyncStorage.getItem('userToken').then((response) => {
      const headers = {
          'Content-Type': 'application/json',
          'x-access-token': response
      };
      session.get("/common/getIssues", {
          params: {
              'lat': this.state.region.latitude,
              'lng': this.state.region.longitude,
              'rad': 5
          },
          headers: headers,
      }).then(response => {
          console.log("marker data is ", response)
          this.setState({markers: response.data.map(issue =>{
              return {
                  latitude:issue.location.lat,
                  longitude:issue.location.lng
              }
              } )});
          console.log("data is ", this.state.markers)
      });
  });
};

  async componentDidMount() {
    await this._setCurrentLocation();
    await this.getMarkers()
      console.log('INDIA')
      if (Platform.OS === 'android') {
        console.log('ANDR')
        Linking.getInitialURL().then(url => {
          console.log(url)
          this.navigate(url);
        });
      } else {
          Linking.addEventListener('url', this.handleOpenURL);
      }
      }
      
      componentWillUnmount() { // C
        Linking.removeEventListener('url', this.handleOpenURL);
      }
  
      handleOpenURL = (event) => { // D
        this.navigate(event.url);
      }
  
      navigate = (url) => {
        if(url){
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        console.log('routeName', routeName);
        if (id){
          navigate('SOSinfo', {id: id});
        }
                } // E
      };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _viewfeed = async () => {
    await this.props.navigation.navigate('feedscreen');
  };

  toggleDrawer = async () => {
    await this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <Container>
        <Banner name="Home" _toggledrawer={this.toggleDrawer} userName={'Siddhant'}/>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={this.state.region}>
            {
                                    (this.state.markers) && this.state.markers.map((marker, key) => (
                                        <Marker
                                            key={key}
                                            coordinate={marker}/>)
                                    )
                                }
          </MapView>
        </View>
        {/* <View style={{flex: 1}}>
          <Text style={styles.text}>Filter By Category</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {icons.map((object, i) => (
              <Button key={i} style={styles.circleShapeView}>
                <Ionicon color="#fff" size={35} name={object.icon} />
                <Text style={styles.iconName}>{object.name}</Text>
              </Button>
            ))}
          </ScrollView>
        </View> */}
      </Container>
    );
  }
}

export default Home;
