import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SignupNextScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FFF'} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>COMPLETE PROFILE</Text>
        <Text style={styles.subtitle}>ew more details</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder='Name'
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder='Phone number'
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder='Address'
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={() => alert('Account created Successfully!')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupNextScreen

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
    fontSize: 26,
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
  button: {
    backgroundColor: '#1E1E2F',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  buttonText: {
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
  loginLink: {
    marginLeft: 6,
    color: '#FF3F00',
    fontWeight: '600',
    fontSize: 15,
  },
})
