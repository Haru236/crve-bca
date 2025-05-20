import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const AccountAndSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogout = () => {
    //  to Clear authentication state here)
 
    navigation.navigate('Login');  // for Redirect to Login screen after logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../Images/pizzaba.webp')} style={styles.profileImage} />
        <Text style={styles.headerText}>Account & Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserProfile')} // to Navigate to UserProfile
        >
          <Text style={styles.buttonTxt}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')} // this is to Navigate to Login screen
        >
          <Text style={styles.buttonTxt}>Login or signup</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Edit Profile</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4' }
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.authContainer}>
        {/* to Add additional auth-related buttons */}
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutbutton} onPress={handleLogout}>
          <Text style={styles.logoutbuttonTxt}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountAndSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#ff7043',
    borderRadius: 30,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  notificationContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  logoutbutton: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
  },
  logoutbuttonTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  // Auth Button Styles
  authContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  authButton: {
    backgroundColor: '#FF3F00',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
