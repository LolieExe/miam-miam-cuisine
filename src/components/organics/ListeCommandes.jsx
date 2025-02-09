import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity,Alert } from "react-native";

const { width, height } = Dimensions.get('window');

export default function ListeCommandes({nom,status,quantite})
{
    return (
        <View style={styles.container}>
            <View style={styles.platContainer}>
              <View style={styles.displays}>
                    <View style={styles.plat}>
                        <Text style={styles.nomPlat}>{nom}</Text>
                    </View>
                    <View style={styles.quantityText}>
                        <Text style={styles.textPrix}>Quantite:{quantite}</Text>
                    </View>
              </View>
                <View style={styles.prix}>
                        <Text style={styles.textPrix}>{status}</Text>
                </View>  
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
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