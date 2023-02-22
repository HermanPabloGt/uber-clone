import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import React from 'react';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    // 
    <SafeAreaView style={styles.container} className="bg-white h-full">
    <View className="p-5">
      <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: "https://links.papareact.com/gzs"}}></Image>
      <GooglePlacesAutocomplete
        styles={{container: {flex: 0}, textInput: {fontSize: 18,}}}
        placeholder="Search"
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en', // language of the results
        }}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        debounce={400}
        onPress={(data, details = null) => {
          dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description
          }));

          dispatch(setDestination(null));
        }}
      />
      <NavOptions></NavOptions>      
      <NavFavourites></NavFavourites> 
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    }
  });