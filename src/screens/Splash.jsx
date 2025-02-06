import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Splash({ navigation }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoggedIn === false) 
            {
                navigation.replace('Login');
            }
        navigation.replace('Home');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    useEffect(() => {
        const checkToken = async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
              setIsLoggedIn(true);
            }
          } catch (error) {
            console.error("Error checking access token:", error);
          } finally {
            setLoading(false);
          }
        };
    
        checkToken();
      }, []);
    

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
    return (
        <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.miam}>MIAM MIAM</Text>
            <Text style={styles.cuisine}>CUISINE</Text>
        </View>
        </View>
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  miam: {
    fontSize: width * 0.1,
    color: '#796120',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cuisine: {
    fontSize: width * 0.2,
    color: '#796120',
    textAlign: 'center',
    fontWeight: 'light',
  },
});