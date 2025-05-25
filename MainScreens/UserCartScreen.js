// src/MainScreens/UserCartScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db, auth } from '../Firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserCartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCartItems = async () => {
        if (!auth.currentUser) {
          setCartItems([]);
          return;
        }
        try {
          const q = query(
            collection(db, 'carts'),
            where('userId', '==', auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setCartItems(items);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      };
      fetchCartItems();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.foodName}>{item.foodName}</Text>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // white background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  quantity: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default UserCartScreen;  