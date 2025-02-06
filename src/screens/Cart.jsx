import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Alert, Dimensions, Image } from 'react-native';
import { CartContext } from '../components/organics/CartContext';

const { width, height } = Dimensions.get('window');
export default function Cart({ navigation }) {
  const { cart, updateQuantity, removeFromCart, clearCart, userId } = useContext(CartContext);

  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  const userCart = cart.filter(item => item.userId === userId);
  const totalPrice = userCart.reduce((total, item) => total + item.prixPlat * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout', `Total: ${totalPrice} AR`, [
      { text: 'OK', onPress: () => clearCart() },
    ]);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.cartContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('User')}>
              <Image source={require('../assets/images/User.png')} style={styles.cartImage} />
              <Text style={styles.cart}>User</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartContainer}>
          <Image source={require('../assets/images/ShoppingCart.png')} style={styles.cartImage} />
          <Text style={styles.cart}>Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.retour}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textRetour}>RETOUR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.panierText}>
        <Text style={styles.textPanier}>PANIER</Text>
      </View>
      {userCart.map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <View style={styles.itemCart}>
            <View>
              <Text style={styles.text}>{item.nomPlat}</Text>
              <Text style={styles.text}>{item.prixPlat} AR</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total: {totalPrice} AR</Text>
        <View style={styles.buttonContainer}>
          <Button title="PAYER" onPress={handleCheckout} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEEC2',
  },
  header: {
    marginTop: 20,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cart:{
    color:'#918CFE',
    fontSize: width * 0.05,
  },
  cartContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    color: '#796120'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#918CFE',
    width: width * 0.2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#796120'
  },
  removeButton: {
    padding: 10,
    backgroundColor: '#FE8CA6',
    width: width * 0.9,
    alignItems: 'center',
    marginTop: 30,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#796120'
  },
  buttonContainer: {
    backgroundColor: '#918CFE',
    padding: 10,
    width: width * 0.9,

  },
  panierText: {
    marginTop: 20,

  },
  textPanier: {
    fontSize: width * 0.08,
    color: '#796120',
    fontWeight: 'bold',
  },
  textRetour: {
    fontSize: width * 0.04,
    color: '#796120',
  },
  itemCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
  }

});