import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Input from '../../components/Input'; 
import Button from '../../components/Button';
import { AuthContext } from '../../services/AuthContext';
import axios from 'axios';

const BASE_URL = 'http://192.168.33.157:5164/TravelMates_SignIn'; 

const VerifyOtpScreen = ({ route, navigation }) => {
  const { user_Id, email, phone_number } = route.params || {}; 
  const isEmailLogin = email ? true : false;
  const identifier = isEmailLogin ? email : phone_number;
  
  console.log('route', route);
  console.log('Email or Phone:', identifier);
  console.log('isEmailLogin:', isEmailLogin);
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const params = {
      eventID: "1005",
      addInfo: {
        user_id: user_Id,
        [isEmailLogin ? 'email' : 'phone_number']: identifier,
        otp
      }
    };

    console.log('verifyOtp OTP with params:', params);

    try {
      const response = await axios.post(BASE_URL, params);
      console.log('Verify OTP Response:', response.data);

      if (response.data.rData && response.data.rData.rCode === 1) {
        Alert.alert('Error', response.data.rData.rMessage || 'Failed to verify OTP.');
      } else {
        Alert.alert('Success', 'OTP verified successfully.');
        navigation.navigate('ResetPasswordScreen', {user_Id, email, phone_number });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.description}>
          Enter the OTP sent to your email address or phone number.
        </Text>

        <Input
          id="otp"
          placeholder="OTP"
          placeholderTextColor="white"
          leftIcon="lock"
          keyboardType="numeric"
          onInputChanged={(id, text) => setOtp(text)}
          value={otp}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Verify OTP"
            onPress={handleVerifyOtp}
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

export default VerifyOtpScreen;
