import React, { useContext, useEffect,useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,ScrollView,Image,Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/firebaseConfig';
const { width } = Dimensions.get('window');
export default function User({ navigation }) {
    const [email, setEmail] = useState('');

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('accessToken');
          navigation.navigate('Login');
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };
    
      useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email);
        }
      }, []);

    return(
        <View style={styles.container}>
            <View style={styles.retour}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                      <Text style={styles.textRetour}>RETOUR</Text>
                    </TouchableOpacity>
            </View>
                <View style={styles.header}>
                    <View style={styles.miammiam}>
                        <Text style={styles.miammiam}>MIAM-MIAM</Text>
                        <Text style={styles.cuisine}>CUISINE</Text>
                    </View>
                    <View style={styles.useremail}>
                        <Text style={styles.useremail}>{email}</Text>
                    </View>
                </View>

    
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.buttons}>
                        <Text style={styles.text}>Panier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.buttons}>
                        <Text style={styles.text}>Deconnexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttons}>
                        <Text style={styles.text}>Commandes</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 100,  
        display:'flex',
        flexDirection: 'column',
    },
    miammiam:{
        fontSize: width * 0.05,
        color:'#796120',
        textAlign:'center',
        fontWeight:'bold',
        fontSize: width * 0.1,
    },
    cuisine:{
        fontSize: width * 0.05,
        color:'#796120',
        textAlign:'center',
        marginBottom:20,
        fontSize: width * 0.15,
    },
    useremail:{
        marginTop:20,
        fontSize: width * 0.05,
        color:'#796120',
        textAlign:'center',
        marginBottom:20,
    },
    actions:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
    },
    text:{
        fontSize: width * 0.05,
        color:'#FFFFFF',
    },
    buttons:{
        backgroundColor:'#918CFE',
        padding:10,
        marginBottom:20,
        width: width * 0.9,
        alignItems:'center',
        padding:20,
    },
    textRetour: {
        marginTop: 40,
        fontSize: width * 0.04,
        color: '#796120',
      },
});