import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button';
import { AuthContext } from '../../services/AuthContext';

const ForgotPasswordScreen = () => {
  const { forgotPassword } = useContext(AuthContext); // Use the context
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); 

  const identifyInputType = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(input)) {
      return 'email';
    } else if (phoneRegex.test(input)) {
      return 'phone_number';
    } else {
      return 'unknown';
    }
  };

  const handleForgotPassword = async () => {
    const inputType = identifyInputType(emailOrPhone);

    if (inputType === 'unknown') {
      Alert.alert('Error', 'Please enter a valid email or phone number.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await forgotPassword(emailOrPhone, inputType === 'email'); 
      console.log('Forgot Password Response:', response);

      if (response.success) {
        Alert.alert('Success', 'OTP sent successfully.');
        // Navigate to the OTP verification screen
        navigation.navigate('VerifyOtpScreen',{
          email: inputType === 'email' ? emailOrPhone : null,
          phone_number: inputType === 'phone_number' ? emailOrPhone : null,
          user_Id: response.user_Id,
        }
         
        );
        
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your email address or phone number to receive a password reset link or code.
        </Text>

        <Input
          id="emailOrPhone"
          placeholder="Email or Phone Number"
          placeholderTextColor="white"
          leftIcon="user"
          onInputChanged={(id, text) => setEmailOrPhone(text)}
          value={emailOrPhone}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Send Reset Code"
            onPress={handleForgotPassword}
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

export default ForgotPasswordScreen;
