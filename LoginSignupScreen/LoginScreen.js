// LoginScreen.js
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { auth, db } from '../Firebase/firebase';  // Adjust path if needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.isAdmin) {
          // Admin trying to login via user login screen
          Alert.alert('Access Denied', 'Admins cannot log in here. Please use Admin Login.');
          await auth.signOut();
          return;
        }

        // Normal user login successful
        Alert.alert('Login Successful', 'Welcome!');
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Login Failed', 'User data not found in database.');
        await auth.signOut();
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1E1E2F'} barStyle="light-content" />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>WELCOME 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Login as Admin Button */}
        <TouchableOpacity style={styles.adminLoginButton} onPress={() => navigation.navigate('AdminLogin')}>
          <Text style={styles.adminLoginButtonText}>Login as Admin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E1E2F',
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
  loginButton: {
    backgroundColor: '#1E1E2F',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1E1E2F',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminLoginButton: {
    backgroundColor: '#FF3F00',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
  },
  adminLoginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  signupButton: {
    marginLeft: 8,
    backgroundColor: '#FF3F00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
