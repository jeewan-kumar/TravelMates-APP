import React, { useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, TextInput } from "react-native";
import Input from "../../components/Input";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={require("../../images/Logo.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Sign in now to access your exercises and saved music.
        </Text>
    
       
        <Input
            id="lastName"
            placeholder=""
            placeholderTextColor="gray"
            // onInputChanged={handleInputChanged}
          />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <View style={styles.loginButtonInner} />
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signUpLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../../images/backgroundimg.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputField: {
    backgroundColor: '#333333',
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#ffffff',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#5F9EA0',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonInner: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#ffffff',
  },
  signUpLink: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    opacity: 0.3,
  },
});

export default LoginScreen;
