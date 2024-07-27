// components/LogoutButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      // Navigate to the login screen or home screen after logout
      navigation.navigate('Welcome'); // Change 'Home' to your desired screen
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out. Please try again.');
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Icon name="sign-out" size={20} color="#fff" />
      <Text style={styles.logoutButtonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LogoutButton;
