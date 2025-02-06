import React, { useState } from "react";
import { TextInput, Image, StyleSheet, Dimensions, Text, View, Alert, TouchableOpacity } from "react-native";
import ValidateButton from "../components/atoms/ValidateButtons";
import Inputs from "../components/atoms/Inputs";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// For responsive design
const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      console.log("Attempting to sign in with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      const token = await user.getIdToken();
      await AsyncStorage.setItem('accessToken', token);

      Alert.alert("Login Successful", `Welcome ${user.email}`);
      navigation.navigate('Home');
    } 
    catch (error) {
      console.error("Error during sign in:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>WELCOME INTO MIAM-MIAM</Text>
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
        onPress={handleLogin} 
        contenu={'CONNEXION'}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signIn}>Vous n'avez pas encore de compte ? Connectez-vous</Text>
      </TouchableOpacity>
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
  signIn: {
    marginTop: 20,
    color: '#796120',
    textDecorationLine: 'underline',
  },
});