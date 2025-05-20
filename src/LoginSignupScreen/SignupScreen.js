import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FFF'} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>CREATE ACCOUNT</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TextInput
          placeholder='Confirm Password'
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpNext')}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupScreen

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
  signupButton: {
    marginLeft: 8,
    // backgroundColor: '#FF3F00',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // borderRadius: 20,
    // elevation: 3,
  },
  signupButtonText: {
    color: '#FF3F00',
    fontWeight: '900',
    // fontSize: 15,
  },
})
