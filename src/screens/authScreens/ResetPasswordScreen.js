import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Alert, View } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';

const BASE_URL = 'http://192.168.33.157:5164/TravelMates_SignIn';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { user_Id, email, phone_number } = route.params;
  const isEmailLogin = email ? true : false;
  const identifier = isEmailLogin ? email : phone_number;
  console.log(route);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const params = {
      eventID: "1006",
      addInfo: {
        user_id: user_Id,
        [isEmailLogin ? 'email' : 'phone_number']: identifier,
        new_password: newPassword,
      },
    };

    console.log('Resetting password with params:', params);

    try {
      const response = await axios.post(BASE_URL, params);
      console.log('Reset Password Response:', response.data);

      if (response.data.rData && response.data.rData.rCode === 0) {
        Alert.alert('Success', 'Your password has been reset successfully.');
        navigation.navigate('SignIn'); 
      } else {
        Alert.alert('Error', response.data.rData.rMessage || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter your new password below.
        </Text>

        <Input
          id="newPassword"
          placeholder="New Password"
          placeholderTextColor="white"
          leftIcon="lock"
          secureTextEntry
          onInputChanged={(id, text) => setNewPassword(text)}
          value={newPassword}
          style={styles.input}
        />
        <Input
          id="confirmPassword"
          placeholder="Confirm Password"
          placeholderTextColor="white"
          leftIcon="lock"
          secureTextEntry
          onInputChanged={(id, text) => setConfirmPassword(text)}
          value={confirmPassword}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            disabled={isLoading}
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'silver',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  btn: {
    width: '80%',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
