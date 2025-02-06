import React from "react";
import { TextInput, Image, StyleSheet, Dimensions, Text, View } from "react-native";

// For responsive design
const { width, height } = Dimensions.get('window');

const Inputs = ({ value, onChangeText, placeholder,secureTextEntry }) => {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#796120',
    padding: 10,
    width: width * 0.9, // 90% of the screen width
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.04, // 5% of the screen width
    color: '#796120',
  },
});

export default Inputs;