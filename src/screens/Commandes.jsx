import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import { CartContext } from '../components/organics/CartContext';
import axios from 'axios';
import ListeCommandes from '../components/organics/ListeCommandes';

const { width, height } = Dimensions.get('window');

export default function Commandes({ navigation }) {
  const { userId } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        // Fetch the user ID using the UID
        const userResponse = await axios.get(`https://miammiam3-production.up.railway.app/api/users/firebase/${userId}`);
        const user = userResponse.data;

        // Fetch orders by user ID
        const ordersResponse = await axios.get(`https://miammiam3-production.up.railway.app/api/orders/by_user/${user.id}`);
        const ordersData = ordersResponse.data;
        setOrders(ordersData);

        // Fetch order items for each order
        const orderItemPromises = ordersData.map(async (order) => {
          const orderItemsResponses = await Promise.all(order.orderItems.map(async (orderItemUrl) => {
            const orderItemResponse = await axios.get(`https://miammiam3-production.up.railway.app${orderItemUrl}`);
            const orderItemData = orderItemResponse.data;

            // Fetch dish details
            const dishResponse = await axios.get(`https://miammiam3-production.up.railway.app${orderItemData.dish}`);
            const dishData = dishResponse.data;

            return {
              ...orderItemData,
              dishName: dishData.name 
            };
          }));
          return orderItemsResponses;
        });

        const orderItemsData = await Promise.all(orderItemPromises);
        setOrderItems(orderItemsData);
        setLoading(false); // Set loading to false after the data is fetched
      } catch (error) {
        console.error('Error fetching orders:', error);
        Alert.alert("Error", "Failed to fetch orders. Please try again.");
        setLoading(false); // Ensure loading is stopped even if there is an error
      }
    };

    fetchOrders();
  }, [userId]);

  
  const handleRecuperer = async (orderId) => {
    try {
      const updatedOrderData = {
        status: "delivered"
      };
      // Call API to update order status to picked up
      await axios.patch(`https://miammiam3-production.up.railway.app/api/orders/${orderId}`, updatedOrderData, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Accept': 'application/ld+json'
        }
      });
      
      Alert.alert("Success", "Order picked up successfully!");

      setOrders((prevOrders) =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: "delivered" } : order
        )
      );
    } catch (error) {
      console.error("Error picking up order:", error);
      Alert.alert("Error", "Failed to pick up the order.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#918CFE" />
      </View>
    );
  }

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
        <Text style={styles.textPanier}>Toutes les commandes</Text>
      </View>
      <ScrollView>
        {orders.map((order, index) => (
          
          <View style={styles.viewStyle} key={index}>
            {order.status === "cooked" && (
                  <TouchableOpacity style={styles.recoverButton} onPress={() => handleRecuperer(order.id)}>
                    <Text style={styles.buttonText}>RECUPERER</Text>
                  </TouchableOpacity>
            )}
            <Text style={styles.textCommande}>Order ID: {order.id}</Text>
            {orderItems[index]?.map((orderItem, idx) => (
              <View key={idx}>
                <ListeCommandes
                  nom={orderItem.dishName}
                  status={order.status}
                  quantite={orderItem.quantity}
                />
                
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEEC2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEEC2',
  },
  loadingText: {
    fontSize: 18,
    color: '#918CFE',
    marginTop: 10,
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
  textCommande: {
    fontSize: 20,
    color: '#796120',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 30,
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
  viewStyle: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#796120',
  },
  recoverButton: {
    backgroundColor: '#918CFE',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
