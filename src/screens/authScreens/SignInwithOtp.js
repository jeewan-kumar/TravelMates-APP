//SignInwithOtp.js


import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button'; // Assuming you have a Button component

const SignInwithOtp = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const identifyInputType = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(input)) {
      return 'email';
    } else if (phoneRegex.test(input)) {
      return 'phone';
    } else {
      return 'unknown';
    }
  };

  const handleSendOtp = () => {
    const inputType = identifyInputType(emailOrPhone);

    if (inputType === 'unknown') {
      Alert.alert('Error', 'Please enter a valid email or phone number.');
      return;
    }

    // Call your API to send OTP
    console.log('Sending OTP to:', emailOrPhone);

    // Simulate OTP sent
    setTimeout(() => {
      Alert.alert('Success', 'OTP sent successfully.');
      setIsOtpSent(true);
    }, 2000);
  };

  const handleSignIn = () => {
    setIsLoading(true);

    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      setIsLoading(false);
      return;
    }

    // Call your API for OTP login
    console.log('Verifying OTP for:', emailOrPhone);
    console.log('OTP:', otp);

    // Simulate success
    setTimeout(() => {
      Alert.alert('Success', 'OTP verified successfully.');
      setIsLoading(false);
      navigation.navigate('Home'); // Adjust navigation as needed
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../images/Logo.png")}
          style={{ width: 100, height: 100, marginLeft: -22, marginTop: 50 }}
        />
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.description}>
          Sign in to TravelMates and unlock a world of shared adventures. Connect with fellow travelers, explore new destinations, and share your experiences effortlessly.
        </Text>

        <Input
          id="emailOrPhone"
          placeholder="Email or Phone Number"
          placeholderTextColor="white"
          leftIcon="user"
          onInputChanged={(id, text) => setEmailOrPhone(text)}
          value={emailOrPhone}
          style={styles.input}
          editable={!isOtpSent}
        />

        {isOtpSent && (
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
        )}

        

        <View style={styles.buttonContainer}>
        {isOtpSent && (
          <TouchableOpacity onPress={handleSendOtp}>
            <Text style={styles.resendOtpLink}>Resend OTP?</Text>
          </TouchableOpacity>
        )}
          <Button 
            title={isOtpSent ? 'Sign In' : 'Send OTP'} 
            onPress={isOtpSent ? handleSignIn : handleSendOtp} 
            disabled={isLoading}
            style={styles.btn}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.bottomLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    textAlign: 'justify',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  btn: {
    width: '80%',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bottomText: {
    color: 'white',
    fontSize: 16,
  },
  bottomLink: {
    color: '#FFD700',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  resendOtpLink: {
    color: '#FFD700',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    marginRight: -10,
  },
});

export default SignInwithOtp;
