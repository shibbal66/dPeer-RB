import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Geolocation from '@react-native-community/geolocation';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Maps = () => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAil4JimP2Tu2dVjgAFOX3A_dNre9d1W5Y';
  const origin = {
    latitude: 30.230722255105633,
    longitude: 71.5174780752946,
  };
  const destination = {
    latitude: 30.230722255605633,
    longitude: 71.5174780742946,
  };
  const [mLat, setmLat] = useState(0);
  const [mLong, setmLong] = useState(0);
  const [screenText, setScreenText] = useState('Press a button');
  const [Bottomtab, setBottomTab] = useState(0);
  const changeText = text => {
    console.log(text + ' has been pressed');
    setScreenText(text);
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else {
      Geolocation.requestAuthorization();
    }
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setmLat(position.coords.latitude);
        setmLong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return (
    <MapView
      style={{width: responsiveWidth(100), height: responsiveHeight(38)}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 30.230722255105633,
        longitude: 71.5174780752946,
        latitudeDelta: 0.5,
        longitudeDelta: 0.4,
      }}
      zoomEnabled={true}
      showsUserLocation={true}
      showsMyLocationButton={true}>
      <Marker
        coordinate={{
          latitude: 30.230722255105633,
          longitude: 71.5174780752946,
        }}>
        <Image
          style={{width: 50, height: 50, resizeMode: 'contain'}}
          source={require('../assets/images/topcar2.png')}
        />
      </Marker>
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor="purple"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  Mapscontainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default Maps;
