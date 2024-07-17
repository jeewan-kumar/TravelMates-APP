// SignUpScreen.js or SignInScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input'; // Adjust the path as necessary

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleInputChanged = (id, text) => {
    switch (id) {
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;
      default:
        break;
    }
  };

  const isValidForm = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  const handleSignUpPress = () => {
    // Validate the form
    if (!isValidForm()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Perform sign-up logic here (e.g., API call)
    console.log('Sign Up initiated...');
    console.log('Email:', email);
    console.log('Password:', password);

    // Example: Navigate to HomeScreen after successful sign-up
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoContainer}>
          <Image 
            source={require("../../images/Logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
        
        <View style={styles.inputField}>
          <Input
            id="email"
            placeholder="Email Address"
            placeholderTextColor="white"
            value={email}
            onInputChanged={handleInputChanged}
            required
          />
          <Input
            id="password"
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            secureTextEntry
            onInputChanged={handleInputChanged}
            required
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style={styles.bottomContainer}>
            <Text style={{ color: "white" }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Background Image */}
        <Image
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("../../images/backgroundimg.png")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
  },
  scroll: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between', 
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: -10,
  },
  signUpText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: -40,
  },
  inputField: {
    marginTop: 20,
    marginBottom: 20, // Added bottom margin for spacing
  },
  signUpButton: {
    backgroundColor: '#5F9EA0',
    width: '70%', // Button width set to 70% of parent container
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  signInText: {
    color: '#5F9EA0',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    opacity: 0.3,
  },
});

export default SignUpScreen;
