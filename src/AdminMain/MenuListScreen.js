import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';

export default function MenuListScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'Chicken Biryani', price: 150, available: true },
    { id: '2', name: 'Veg Pulao', price: 120, available: false },
    { id: '3', name: 'Paneer Butter Masala', price: 180, available: true },
  ]);

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    Alert.alert('Success', 'Item deleted successfully!');
  };

  const handleEditItem = (itemId) => {
    Alert.alert('Edit Item', `You can now edit item with ID: ${itemId}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText}>
        {item.name} - ₹{item.price} ({item.available ? 'Available' : 'Unavailable'})
      </Text>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditItem(item.id)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu List</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.itemList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemList: {
    marginTop: 16,
  },
  itemRow: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
