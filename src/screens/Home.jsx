import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity,ScrollView,Image,Dimensions } from "react-native";
import ListePlats from "../components/organics/ListePlats";
import plats from "../datas/PlatsTest";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
export default function Home({ navigation }) {
  

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
            key={plat.id}
            id={plat.id}
            nomPlat={plat.nom}
            prixPlat={plat.prix}
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
  title: {
    marginTop: 20,  
  },
  text:{
    fontSize: width * 0.08,
    color: '#796120',
    fontWeight: 'bold',
  }
});
