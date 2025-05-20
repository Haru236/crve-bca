import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const UserCartScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerHead}>Cart Items</Text>

        <View style={styles.containerCartList}>
          <View style={styles.containerCart}>
            <Image source={require('../Images/OIP (1).jpg')} style={styles.cartimage} />
            <View style={styles.containerCart_in}>
              <View style={styles.containerCart_in1}>
                <Text style={styles.restaurantName}>Meow Core Cafe</Text>
              </View>
              <View style={styles.containerCart_in2}>
                <Text style={styles.containerCart_in2_itemName}>Noodles</Text>
                <Text style={styles.containerCart_in2_itemPrice}>₹60</Text>
                <Text style={styles.containerCart_in2_itemQty}>Quantity: 1</Text>
              </View>
              <View style={styles.containerCart_in3}>
                <TouchableOpacity style={styles.deleteBtn}>
                  <Text style={styles.deleteBtnText}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserCartScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#FF6F00',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  closeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  containerHead: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  containerCartList: {
    marginTop: 15,
  },
  containerCart: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'center',
    padding: 10,
  },
  cartimage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  containerCart_in: {
    flexDirection: 'column',
    width: '75%',
    paddingHorizontal: 10,
  },
  containerCart_in1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  containerCart_in2: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  containerCart_in2_itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  containerCart_in2_itemPrice: {
    fontSize: 14,
    color: '#FF6F00',
    fontWeight: '600',
    marginTop: 5,
  },
  containerCart_in2_itemQty: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  containerCart_in3: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: '#FF3F00',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
  },
  deleteBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
})
