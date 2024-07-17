// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const WelcomeScreen = () => {
//   const navigation = useNavigation();

//   const handleGoogleSignIn = () => {
//     // Handle Google sign in logic
//   };

//   const handleFacebookSignIn = () => {
//     // Handle Facebook sign in logic
//   };

//   const handlePhoneNumberSignIn = () => {
//     // Handle phone number sign in logic
//   };

//   const handleTroubleSigningIn = () => {
//     // Handle trouble signing in logic
//   };

//   const openTermsLink = () => {
//     Linking.openURL('https://example.com/terms'); 
//   };

//   const openPrivacyPolicyLink = () => {
//     Linking.openURL('https://example.com/privacy');
//   };

//   const openCookiesPolicyLink = () => {
//     Linking.openURL('https://example.com/cookies'); 
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo Section */}
//       <View style={styles.logoContainer}>
//         <Text style={styles.logo}>TravelMate</Text>
//       </View>

//       {/* Buttons Section */}
//       <View style={[styles.buttonSection, { flex: 4 }]}>
//         <Text style={styles.agreementText}>
//           By tapping “Sign in”, you agree to our{' '}
//           <Text style={styles.linkText} onPress={openTermsLink}>
//             Terms
//           </Text>
//           . Learn how we process your data in our{' '}
//           <Text style={styles.linkText} onPress={openPrivacyPolicyLink}>
//             Privacy Policy
//           </Text>{' '}
//           and{' '}
//           <Text style={styles.linkText} onPress={openCookiesPolicyLink}>
//             Cookies Policy
//           </Text>
//           .
//         </Text>
//         <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
//           <Image style={styles.image} source={require('../../images/Google.jpg')} />
//           <Text style={styles.buttonText}>Sign in / Sign up with Google</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handlePhoneNumberSignIn}>
//           <Image style={styles.image} source={require('../../images/Phone.png')} />
//           <Text style={styles.buttonText}>Sign in / Sign up with phone number</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleFacebookSignIn}>
//           {/* <Image style={styles.image} source={require('../../images/Facebook.jpg')} /> */}
//           <Text style={styles.buttonText}>Continue With Email</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleTroubleSigningIn}>
//           <Text style={styles.troubleText}>Trouble signing in?</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FF6F61',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     flex: 6, // Takes 70% of vertical space
//     justifyContent: 'center',
//   },
//   logo: {
//     color: 'black',
//     fontSize: 30,
//     fontWeight: 'bold',
//     fontFamily: 'Black Ops One',
//     textAlign: 'center',
//   },
//   agreementText: {
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 20,
//     fontSize: 15,
//     fontWeight:'bold'
//   },
//   linkText: {
//     textDecorationLine: 'underline',
//   },
//   buttonSection: {
//     flex: 4, 
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#000',
//     borderRadius: 25,
//     alignItems: 'center',
//     marginVertical: 10,
//     flexDirection: 'row', // align items horizontally
//     justifyContent: 'center', // center items horizontally
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     marginLeft: 10, // Add margin between image and text
//   },
//   troubleText: {
//     color: '#FFF',
//     textAlign: 'center',
//     marginTop: 20,
//     textDecorationLine: 'underline',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   image: {
//     height: 20,
//     width: 20,
//     marginLeft: 10, // Adjust as needed
//   },
// });

// export default WelcomeScreen;


import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignupPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../../images/background.png")}
      />
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoIcon}
            resizeMode="cover"
            source={require("../../images/LogoImg.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome to TravelMates!</Text>
            <Text style={styles.descriptionText}>
              Connect with fellow travelers, explore new destinations, and plan unforgettable adventures together. Start your journey today!
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login With Email</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer} >
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={handleSignupPress}>
            <Text style={[styles.signupText, styles.signupLink]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.05,
  },
  logoContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
  },
  welcomeText: {
    fontSize: windowWidth * 0.07,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: windowWidth * 0.04,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.03,
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#2f4f4f',
    width: windowWidth * 0.7,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: windowHeight * 0.03,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: windowWidth * 0.05,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.01,
  },
  signupText: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: windowWidth * 0.04,
  },
  signupLink: {
    fontWeight: '700',
    marginLeft: 5,
    fontSize: windowWidth * 0.04,
  },
});

export default WelcomeScreen;
