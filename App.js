import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/LoginSignupScreen/SignupScreen';
import SignupNextScreen from './src/LoginSignupScreen/SignupNextScreen';
import AppNav from './src/Navigation/AppNav';
import AdminLoginScreen from './src/AdminScreen/AdminLogin';
import AdminSignUpScreen from './src/AdminScreen/AdminSignup';
import AddItemScreen from './src/AdminMain/AddItemScreen';
import MenuListScreen from './src/AdminMain/MenuListScreen';
import OrdersScreen from './src/AdminMain/OrderScreen';
import AdminNav from './src/Navigation/AdminNav';
import AdminHomePage from './src/AdminMain/Adminhomepage';
// import {getAuth, createUserWithEmailAndPassword, SignInWithEmailAndPassword, onAuthStateChanged, SignOut} from '@firbase/auth';
// // import {initializeApp} from '@firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDhskWmaawSx0iHLxg5poH-vofqyMeJQu0",
//   authDomain: "crve-adab8.firebaseapp.com",
//   projectId: "crve-adab8",
//   storageBucket: "crve-adab8.firebasestorage.app",85rj 
//   messagingSenderId: "421644574053",
//   appId: "1:421644574053:web:b67 ba163741808db6fd58c",
//   measurementId: "G-VYP5W084RV"
// };
// const app= initializeApp(firebaseConfig); 36y  
// export default function App({email, setEmail, password, setPassword, handleAuthentication})

// {
// return(
//   <View style={style.container}>


//   </View>
// )
// }

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {/* <LoginScreen/> */}
      {/* <SignupScreen/> */}
      {/* <SignupNextScreen/> */}
      <AppNav/>
      {/* <AdminLoginScreen/> */}
      {/* <AdminSignUpScreen/> */}
      {/* <AdminHomePage/> */}
      {/* <AddItemScreen/> */}
      {/* <MenuListScreen/> */}
      {/* <OrdersScreen/> */}
      {/* <AdminNav/> */}
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});  