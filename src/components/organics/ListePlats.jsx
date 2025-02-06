import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity,Alert } from "react-native";
import ValidateButton from "../atoms/ValidateButtons";
import { CartContext } from "./CartContext";

// For responsive design
const { width, height } = Dimensions.get('window');

export default function ListePlats({ id, nomPlat, prixPlat }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ id, nomPlat, prixPlat, quantity });
    Alert.alert(
      "Ajouté au panier",
      `${nomPlat} a été ajouté au panier.`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.platContainer}>
        <View style={styles.plat}>
          <Text style={styles.nomPlat}>{nomPlat}</Text>
        </View>

        <View style={styles.prix}>
          <Text style={styles.textPrix}>{prixPlat} AR</Text>
        </View>

        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.validateButtonContainer}>
        <ValidateButton 
          contenu={'COMMANDER'} 
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    platContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#796120',
      padding: 10,
      width: width * 0.9,
    },
    nomPlat: {
      fontSize: width * 0.07,
      color: '#796120',
      fontWeight: 'bold',
    },
    textPrix: {
      fontSize: width * 0.05,
      color: '#796120',
    },
    quantityContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    button: {
      backgroundColor: '#918CFE',
      padding: 10,
      width: width * 0.3,
      alignItems: 'center',
      
    },
    buttonText: {
        color: '#FFFFFF',
    },
    quantityText: {
      fontSize: width * 0.05,
      color: '#796120',
    },

});