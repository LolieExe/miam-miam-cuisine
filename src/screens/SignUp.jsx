import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import ValidateButton from "../components/atoms/ValidateButtons";
import Inputs from "../components/atoms/Inputs";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare user data for the backend
      const userData = {
        firebaseUid: user.uid,
        email: user.email,
        name: user.email,
        createdAt: new Date().toISOString()
      };

      // Send user data to the backend
      try {
        const response = await axios.post('https://miammiam3-production.up.railway.app/api/users', userData, {
          headers: {
            'Content-Type': 'application/ld+json'
          }
        });
        console.log('User saved to backend:', response.data);
        Alert.alert("Sign Up Successful", `Welcome ${user.email}`);
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error saving user to backend:', error);
        Alert.alert("Error", "Failed to save user data. Please try again.");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Sign Up Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CREER UN COMPTE</Text>
      <Inputs 
        placeholder={'E-MAIL'}
        value={email}
        onChangeText={setEmail}
      />
      <Inputs 
        placeholder={'MOT DE PASSE'}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <ValidateButton 
        onPress={handleSignUp} 
        contenu={'SIGN UP'} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAD4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#796120',
    marginBottom: 20,
  },
});