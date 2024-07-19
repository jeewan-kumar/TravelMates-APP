import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button';

const VerificationScreen = ({ route, navigation }) => {
//   const { emailOrPhone } = route.params; // Passed from previous screen
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = () => {
    setIsLoading(true);

    if (!emailOtp || !phoneOtp) {
      Alert.alert('Error', 'Please enter both email and phone OTPs.');
      setIsLoading(false);
      return;
    }

    // Call your API to verify OTPs
    console.log('Email OTP:', emailOtp);
    console.log('Phone OTP:', phoneOtp);
    // Example API call:
    // fetch('https://your-api.com/verify-otp', {
    //   method: 'POST',
    //   body: JSON.stringify({ emailOrPhone, emailOtp, phoneOtp })
    // })

    // Simulate success
    setTimeout(() => {
      Alert.alert('Success', 'OTPs verified successfully.');
      setIsLoading(false);
      // Navigate to the next screen, e.g., ResetPassword
      navigation.navigate('ResetPassword', { emailOrPhone });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.description}>
          Enter the OTPs sent to your email address and phone number.
        </Text>

        <Input
          id="emailOtp"
          placeholder="Enter Email OTP"
          placeholderTextColor="white"
          leftIcon="mail"
          keyboardType="numeric"
          onInputChanged={(id, text) => setEmailOtp(text)}
          value={emailOtp}
          style={styles.input}
        />
        <Input
          id="phoneOtp"
          placeholder="Enter Phone OTP"
          placeholderTextColor="white"
          leftIcon="phone"
          keyboardType="numeric"
          onInputChanged={(id, text) => setPhoneOtp(text)}
          value={phoneOtp}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Verify OTPs"
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

export default VerificationScreen;
