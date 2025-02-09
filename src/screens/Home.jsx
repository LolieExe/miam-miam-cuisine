import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator } from "react-native";
import ListePlats from "../components/organics/ListePlats";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlats();
  }, []);

  const fetchPlats = async () => {
    try {
      const response = await axios.get('https://miammiam3-production.up.railway.app/api/dishes');
      setPlats(response.data.member);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
      <View style={styles.title}>
        <Text style={styles.text}>TOUS LES PLATS</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {plats.map((plat) => (
          <ListePlats
            key={plat["@id"]}
            id={plat["@id"]}
            nomPlat={plat.name}
            prixPlat={plat.price}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEC2',
    padding: 20,
  },
  header: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  cart: {
    fontSize: 16,
    color: '#918CFE',
  },
  title: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#918CFE',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEEC2',
  },
});
