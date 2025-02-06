import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../services/firebaseConfig';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error loading cart from AsyncStorage:", error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to AsyncStorage:", error);
      }
    };

    saveCart();
  }, [cart]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id && cartItem.userId === userId);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.userId === userId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item,userId,quantity: item.quantity }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    if (!userId) return;
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.userId === userId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (id) => {
    if (!userId) return
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id || cartItem.userId !== userId));
  };

  const clearCart = () => {
    if (!userId) return
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.userId !== userId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart,userId }}>
      {children}
    </CartContext.Provider>
  );
};