import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/themed";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Good Morning</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <GooglePlacesAutocomplete
          styles={{ container: { flex: 0, paddingTop: 20 }, textInput: { fontSize: 18 } }}
          placeholder="Where to?"
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en", // language of the results
          }}
          minLength={2}
          debounce={400}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
                setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
            navigation.navigate('RideOptionsCard')
          }}
        />
        <NavFavourites></NavFavourites>      
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity className="flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full"
          onPress={
            () => navigation.navigate("RideOptionsCard")
          }>
          <Icon name="car" type="font-awesome" color="white" size={16}></Icon>
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between w-24 px-4 py-3 rounded-full">
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16}></Icon>
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
