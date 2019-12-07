import React, {Component} from 'react';
import {ScrollView, View, Text, AsyncStorage} from 'react-native';
import {Container, Button, Content} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Banner from '../../components/banner';
import styles from './styles';
import getIssues from '../../api/home';

const icons = [
  {name: 'Fire', icon: 'md-flame'},
  {name: 'Garbage', icon: 'md-pint'},
  {name: 'Water', icon: 'md-water'},
  {name: 'Pests', icon: 'md-bug'},
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      markers: null,
      error: null,
    };
  }

  async componentDidMount() {
    Geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 0},
    );

    const radius = 10;
    // this.setState({
    //     markers: await getIssues(this.state.region.latitude, this.state.region.longitude, radius).then(response => response.data)
    // })
  }

  async componentDidUpdate(prevState) {
    const radius = 10;
    if (this.state.region !== prevState.region) {
      // this.setState({
      //     markers: await getIssues(this.state.region.latitude, this.state.region.longitude, radius).then(response => response.data)
      // })
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  _viewfeed = async () => {
    await this.props.navigation.navigate('feedscreen');
  };

  render() {
    return (
      <Container>
        <Banner name="Home" />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={this.state.region}>
            {/*{*/}
            {/*    this.state.markers && this.state.markers.map(marker => (*/}
            {/*        <Marker*/}
            {/*            coordinate={[marker.latitude, marker.longitude]}*/}
            {/*            title={marker.title}*/}
            {/*            description={marker.description}/>)*/}
            {/*    )*/}
            {/*}*/}
          </MapView>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.text}>Filter By Category</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {icons.map((object, i) => (
              <Button key={i} style={styles.circleShapeView}>
                <Ionicon color="#fff" size={35} name={object.icon} />
                <Text style={styles.iconName}>{object.name}</Text>
              </Button>
            ))}
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default Home;
