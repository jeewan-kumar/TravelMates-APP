import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button';

const VerifyOtpScreen = ({ route, navigation }) => {
//   const { emailOrPhone } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = () => {
    setIsLoading(true);

    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      setIsLoading(false);
      return;
    }

    // Call your API to verify OTP
    console.log('Verifying OTP for:', emailOrPhone);
    console.log('OTP:', otp);
    // Example: fetch('https://your-api.com/verify-otp', { method: 'POST', body: JSON.stringify({ emailOrPhone, otp }) })

    // Simulate success
    setTimeout(() => {
      Alert.alert('Success', 'OTP verified successfully.');
      setIsLoading(false);
      navigation.navigate('ResetPassword', { emailOrPhone });
    }, 2000);
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
