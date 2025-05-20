import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Fontisto from '@expo/vector-icons/Fontisto'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const UserProfile = () => {
  const navigation = useNavigation()

  const [isEditable, setIsEditable] = useState(false) // new
  const [name, setName] = useState('PNF')
  const [email, setEmail] = useState('PNF@gmail.com')
  const [address, setAddress] = useState('New PNF Address')
  const [phone, setPhone] = useState('454545545')

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.container_In}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome name="user-circle" size={30} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          value={name}
          onChangeText={setName}
          editable={isEditable} 
        />
      </View>

      <View style={styles.container_Inputfield}>
        <Fontisto name="email" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          editable={isEditable} 
        />
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome6 name="address-card" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Address'
          value={address}
          onChangeText={setAddress}
          editable={isEditable}
        />
      </View>

      <View style={styles.container_Inputfield}>
        <Feather name="phone" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Phone'
          value={phone}
          onChangeText={setPhone}
          editable={isEditable} 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
  if (isEditable) {
    // When saving
    alert('Profile saved successfully!');
  }
  setIsEditable(!isEditable);
}}>
        <Text style={styles.buttonTxt}>
          {isEditable ? 'Save' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  container_In: {
    backgroundColor: 'grey',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 30
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container_Inputfield: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFF',
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    elevation: 3,
  },
  icon: {
    paddingLeft: 10,
  },
  input: {
    paddingLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6F00',
    borderRadius: 25,
    width: '92%',
    alignSelf: 'center',
    padding: 15,
    elevation: 4,
    marginTop: 25,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'grey',
    padding: 10,
    paddingLeft: 5,
    zIndex: 10,
  },
})
