import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { CartContext } from '../components/organics/CartContext';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Cart({ navigation }) {
  const { cart, updateQuantity, removeFromCart, clearCart, userId } = useContext(CartContext);

  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  const userCart = cart.filter(item => item.userId === userId);
  const totalPrice = userCart.reduce((total, item) => total + item.prixPlat * item.quantity, 0);

  const handleCheckout = async () => {
    try {
    
      const userResponse = await axios.get(`https://miammiam3-production.up.railway.app/api/users/firebase/${userId}`);
      const user = userResponse.data;

      // Prepare initial order data without orderItems
      const initialOrderData = {
        utilisateur: `/api/users/${user.id}`,
        totalAmount: totalPrice.toFixed(2),
        status: "paid",
        createdAt: new Date().toISOString(),
        orderItems: []
      };

      // Create the order
      const orderResponse = await axios.post('https://miammiam3-production.up.railway.app/api/orders', initialOrderData, {
        headers: {
          'Content-Type': 'application/ld+json',
          'Allow-Control-Allow-Origin': '*',
          'Accept':'application/ld+json'
        }
      });
      const orderIri = orderResponse.data['@id'];
      // Create order items and kitchen items
      const orderItemPromises = userCart.map(async (item) => {
        const orderItemData = {
          commande: orderIri,
          dish: `${item.id}`,
          quantity: item.quantity
        };
        const orderItemResponse = await axios.post('https://miammiam3-production.up.railway.app/api/order_items', orderItemData, {
          headers: {
            'Content-Type': 'application/ld+json',
            'Allow-Control-Allow-Origin': '*',
             'Accept':'application/ld+json'
          }
        });
        const orderItemIri = orderItemResponse.data['@id'];

        // Create kitchen items for each quantity of the dish
        const kitchenItemPromises = Array.from({ length: item.quantity }).map(async () => {
          const kitchenItemData = {
            commande: orderIri,
            dish: `${item.id}`,
            status: "pending",
            quantity: 1
          };
          const kitchenItemResponse = await axios.post('https://miammiam3-production.up.railway.app/api/kitchen_items', kitchenItemData, {
            headers: {
              'Content-Type': 'application/ld+json',
              'Allow-Control-Allow-Origin': '*',
               'Accept':'application/ld+json'
            }
          });
          return kitchenItemResponse.data['@id'];
        });

        await Promise.all(kitchenItemPromises);
        return orderItemIri;
      });

      const orderItems = await Promise.all(orderItemPromises);

      const updatedOrderData = {
        orderItems: orderItems
      };

      await axios.put(orderIri, updatedOrderData, {
        headers: {
          'Content-Type': 'application/ld+json',
          'Accept':'application/ld+json'
        }
      });

      console.log('Order saved to backend:', orderResponse.data);
      clearCart();
    } 
    catch (error) 
    {
        clearCart();
    }
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
        <TouchableOpacity onPress={handleCheckout} style={styles.buttonContainer}>
          <Text style={styles.textPayer}>PAYER</Text>
        </TouchableOpacity>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cart: {
    color: '#918CFE',
    fontSize: width * 0.05,
  },
  cartContainer: {
    display: 'flex',
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
    color: '#796120',
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
    color: '#796120',
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
    color: '#796120',
  },
  buttonContainer: {
    backgroundColor: '#918CFE',
    padding: 10,
    width: width * 0.9,
    alignItems: 'center',
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
  },
  textPayer: {
    color: '#fff',
    fontSize: 16,
  },
});