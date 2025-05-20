import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

export default function AdminSettingsScreen({ navigation }) {
  const [restaurantName, setRestaurantName] = useState("CRVE Restaurant");
  const [email, setEmail] = useState("admin@crve.com");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.', [
      {
        text: 'OK',
        onPress: () => navigation.replace('AdminLogin'),
      },
    ]);
  };

  const handleSaveChanges = () => {
    Alert.alert('Saved', 'Your changes have been saved!');
    setIsEditingProfile(false);
  };

  const handleBack = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backText}>Back   </Text>
          </TouchableOpacity>
          <Text style={styles.heading}>               Settings</Text>
        </View>

        {/* Restaurant Name */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Restaurant Name</Text>
          {isEditingProfile ? (
            <TextInput
              style={styles.input}
              value={restaurantName}
              onChangeText={setRestaurantName}
            />
          ) : (
            <Text style={styles.value}>{restaurantName}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Email</Text>
          {isEditingProfile ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
        </View>

        {/* Edit / Save */}
        {!isEditingProfile ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingProfile(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.changeButton} onPress={handleSaveChanges}>
            <Text style={styles.changeButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    color: '#3b82f6',
    fontSize: 16,
    marginRight: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  settingItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#777',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#e53935',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
