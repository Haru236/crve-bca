import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../Components/Categories';
import OfferSlider from '../Components/OfferSlider';
import CartSlider from '../Components/CartSlider';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#FF3F00'} style="light" />

      <Headerbar />

      <TouchableOpacity style={styles.searchbox}>
        <AntDesign name="search1" size={20} color="#FF3F00" />
        <Text style={styles.input}>Search your cravings...</Text>
      </TouchableOpacity>

      <Categories />
      <OfferSlider />
      <CartSlider navigation={navigation} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 10,
  },
  searchbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#888',
    flex: 1,
  }
})
