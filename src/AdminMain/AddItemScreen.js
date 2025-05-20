import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (!name || !price) {
      Alert.alert('Missing Info', 'Please enter both name and price.');
      return;
    }

    const newItem = {
      name,
      price: parseFloat(price),
      available,
    };

    // Add new item to the list
    setItems([...items, newItem]);

    // Clear the form
    setName('');
    setPrice('');
    setAvailable(true);

    Alert.alert('Success', 'Item added successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Food Item</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Chicken Biryani"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 150"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Available</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>➕ Add Item</Text>
      </TouchableOpacity>

      <View style={styles.itemList}>
        <Text style={styles.itemListTitle}>Added Items:</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemText}>
              {item.name} - ₹{item.price} ({item.available ? 'Available' : 'Unavailable'})
            </Text>
          </View>
        ))}
      </View>
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
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  itemList: {
    marginTop: 30,
  },
  itemListTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemRow: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
