import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const AdminSignUpScreen = ({ navigation }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // this is for handling  the sign up (Firebase etc.) thanks ziben
    alert(`Account Created for  ${adminName} of ${restaurantName}!`);
    navigation.navigate('AdminLogin');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1E1E2F'} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>ADMIN SIGN UP </Text>
        <Text style={styles.subtitle}>Create your admin account</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder='Restaurant Name'
          style={styles.input}
          placeholderTextColor="#aaa"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <TextInput
          placeholder='Admin Name'
          style={styles.input}
          placeholderTextColor="#aaa"
          value={adminName}
          onChangeText={setAdminName}
        />
        <TextInput
          placeholder='Admin Email'
          keyboardType='email-address'
          style={styles.input}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder='Confirm Password'
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signupButtonMain} onPress={handleSignUp}>
          <Text style={styles.signupButtonTextMain}>Sign Up as Admin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an admin account?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AdminLogin')}>
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3F00',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  signupButtonMain: {
    backgroundColor: '#FF3F00',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF3F00',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  signupButtonTextMain: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  loginButton: {
    marginLeft: 8,
    backgroundColor: '#1E1E2F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
