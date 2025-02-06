import React from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions, Text, View } from "react-native";

// For responsive design
const { width, height } = Dimensions.get('window');

const ValidateButton = ({ onPress, contenu, imageLnk,color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>{contenu}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop:20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    color: '#000000',
    textAlign: 'center',
    fontSize: width * 0.03, // 5% of the screen width
    backgroundColor: '#918CFE',
    padding:10,
    color: '#FFFFFF',
    width: width * 0.9, // 90% of the screen width

  },
});

export default ValidateButton;