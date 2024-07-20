
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button'; // Assuming you have a Button component
const API_BASE_URL = 'http://192.168.33.157:5164/TravelMates_SignIn';
const SignInScreen = ({ navigation }) => {
  const [signInType, setSignInType] = useState('password'); // 'password' or 'otp'
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSendOtp = async () => {
    const inputType = identifyInputType(emailOrPhone);

    if (inputType === 'unknown') {
      Alert.alert('Error', 'Please enter a valid email or phone number.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}`, {
        inputType,
        emailOrPhone
      });

      if (response.data.success) {
        Alert.alert('Success', 'OTP sent successfully.');
        setIsOtpSent(true);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}`, {
        emailOrPhone
      });

      if (response.data.success) {
        Alert.alert('Success', 'OTP resent successfully.');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const inputType = identifyInputType(emailOrPhone);

    try {
      let response;

      if (signInType === 'password') {
        if (inputType === 'unknown' || !password) {
          Alert.alert('Error', 'Please enter a valid email or phone number and password.');
          return;
        }

        response = await axios.post(`${API_BASE_URL}`, {
          emailOrPhone,
          password
        });
      } else if (signInType === 'otp') {
        if (inputType === 'unknown' || !otp) {
          Alert.alert('Error', 'Please enter a valid email or phone number and OTP.');
          return;
        }

        response = await axios.post(`${API_BASE_URL}`, {
          emailOrPhone,
          otp
        });
      }

      if (response.data.success) {
        Alert.alert('Success', 'Sign in successful.');
        navigation.navigate('Home'); // Adjust navigation as needed
      } else {
        Alert.alert('Error', response.data.message || 'Sign in failed.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../images/Logo.png")}
          style={styles.logo}
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
          editable={!isOtpSent || signInType === 'password'}
        />

        {signInType === 'password' && (
          <Input
            id="password"
            placeholder="Password"
            placeholderTextColor="white"
            leftIcon="lock"
            secureTextEntry
            onInputChanged={(id, text) => setPassword(text)}
            value={password}
            style={styles.input}
          />
        )}

        {signInType === 'otp' && isOtpSent && (
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
          {signInType === 'password' && !isOtpSent && (
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {signInType === 'password' && !isOtpSent && (
            <Button
              title="Sign In"
              onPress={handleSignIn}
              disabled={isLoading}
              style={styles.btn}
            />
          )}

          {signInType === 'otp' && (
            <>
              {!isOtpSent ? (
                <Button
                  title="Send OTP"
                  onPress={handleSendOtp}
                  disabled={isLoading}
                  style={styles.btn}
                />
              ) : (
                <>
                  <Button
                    title="Sign In"
                    onPress={handleSignIn}
                    disabled={isLoading}
                    style={styles.btn}
                  />
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={styles.resendOtpText}>Resend OTP</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          <TouchableOpacity
            onPress={() => setSignInType(signInType === 'password' ? 'otp' : 'password')}
          >
            <Text style={styles.switchText}>
              {signInType === 'password' ? 'Sign in with OTP' : 'Sign in with Password'}
            </Text>
          </TouchableOpacity>

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
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
    width: '85%',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  switchText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resendOtpText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
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
  forgotPasswordLink: {
    color: '#FFD700',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default SignInScreen;

// // SignUpScreen.js or SignInScreen.js

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import Input from '../../components/Input'; // Adjust the path as necessary

// const SignUpScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();

//   const handleInputChanged = (id, text) => {
//     switch (id) {
//       case 'email':
//         setEmail(text);
//         break;
//       case 'password':
//         setPassword(text);
//         break;
//       default:
//         break;
//     }
//   };

//   const isValidForm = () => {
//     return email.trim() !== '' && password.trim() !== '';
//   };

//   const handleSignUpPress = () => {
//     // Validate the form
//     if (!isValidForm()) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     // Perform sign-up logic here (e.g., API call)
//     console.log('Sign Up initiated...');
//     console.log('Email:', email);
//     console.log('Password:', password);

//     // Example: Navigate to HomeScreen after successful sign-up
//     navigation.navigate('HomeScreen');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.logoContainer}>
//           <Image 
//             source={require("../../images/Logo.png")}
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//           <Text style={styles.signUpText}>Sign Up</Text>
//         </View>
        
//         <View style={styles.inputField}>
//           <Input
//             id="email"
//             placeholder="Email Address"
//             placeholderTextColor="white"
//             value={email}
//             onInputChanged={handleInputChanged}
//             required
//           />
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
//             value={password}
//             secureTextEntry
//             onInputChanged={handleInputChanged}
//             required
//           />
//           <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//           </TouchableOpacity>
          
//           <View style={styles.bottomContainer}>
//             <Text style={{ color: "white" }}>Already have an account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//               <Text style={styles.signInText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Background Image */}
//         <Image
//           style={styles.backgroundImage}
//           resizeMode="cover"
//           source={require("../../images/backgroundimg.png")}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2f4f4f',
//   },
//   scroll: {
//     flexGrow: 1,
//     padding: 16,
//     justifyContent: 'space-between', 
//   },
//   logoContainer: {
//     alignItems: 'center',
//   },
//   logoImage: {
//     width: 200,
//     height: 200,
//     marginBottom: -10,
//   },
//   signUpText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 30,
//     marginTop: -40,
//   },
//   inputField: {
//     marginTop: 20,
//     marginBottom: 20, // Added bottom margin for spacing
//   },
//   signUpButton: {
//     backgroundColor: '#5F9EA0',
//     width: '70%', // Button width set to 70% of parent container
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   signUpButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   bottomContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 12,
//   },
//   signInText: {
//     color: '#5F9EA0',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: '50%',
//     opacity: 0.3,
//   },
// });

// export default SignUpScreen;

// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button'; // Assuming you have a Button component

// const SignInScreen = ({ navigation }) => {
//   const [signInType, setSignInType] = useState('password'); // 'password' or 'otp'
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const identifyInputType = (input) => {
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     const phoneRegex = /^\d{10}$/;

//     if (emailRegex.test(input)) {
//       return 'email';
//     } else if (phoneRegex.test(input)) {
//       return 'phone';
//     } else {
//       return 'unknown';
//     }
//   };

//   const handleSignIn = () => {
//     setIsLoading(true);

//     const inputType = identifyInputType(emailOrPhone);

//     if (signInType === 'password') {
//       if (inputType === 'unknown' || !password) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and password.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and password login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('Password:', password);
//     } else if (signInType === 'otp') {
//       if (inputType === 'unknown' || !otp) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and OTP.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and OTP login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('OTP:', otp);
//     }
    
//     setIsLoading(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//       <Image
//           source={require("../../images/Logo.png")}
//           style={{ width: 100, height: 100, marginLeft: -22, marginTop: 50 }}
//         />
//         <Text style={styles.title}>Sign In</Text>
//         <Text style={styles.description}>
//         Sign in to TravelMates and unlock a world of shared adventures. Connect with fellow travelers, explore new destinations, and share your experiences effortlessly.
//         </Text>

//         <Input
//           id="emailOrPhone"
//           placeholder="Email or Phone Number"
//           placeholderTextColor="white"
//           leftIcon="user"
//           onInputChanged={(id, text) => setEmailOrPhone(text)}
//           value={emailOrPhone}
//           style={styles.input}
//         />

//         {signInType === 'password' ? (
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             secureTextEntry
//             onInputChanged={(id, text) => setPassword(text)}
//             value={password}
//             style={styles.input}
//           />
//         ) : (
//           <Input
//             id="otp"
//             placeholder="OTP"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             keyboardType="numeric"
//             onInputChanged={(id, text) => setOtp(text)}
//             value={otp}
//             style={styles.input}
//           />
//         )}

//         <View style={styles.buttonContainer}>
//           <Button 
//             title={signInType === 'password' ? 'Sign In' : 'Verify OTP'} 
//             onPress={handleSignIn} 
//             disabled={isLoading}
//             style={styles.btn}
//           />
//           <View style={styles.switchContainer}>
//             <TouchableOpacity onPress={() => setSignInType(signInType === 'password' ? 'otp' : 'password')}>
//               <Text style={styles.switchText}>
//                 {signInType === 'password' ? 'Use OTP instead' : 'Use Password instead'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.bottomContainer}>
//             <Text style={styles.bottomText}>Don't have an account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//               <Text style={styles.bottomLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2f4f4f',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     color: 'silver',
//     fontSize: 15,
//     textAlign: 'justify',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   switchContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   switchText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   btn: {
//     width: '80%',
//     marginVertical: 10,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 12,
//   },
//   bottomText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   bottomLink: {
//     color: '#FFD700',
//     fontSize: 16,
//     marginLeft: 5,
//     fontWeight: 'bold',
//   },
// });

// export default SignInScreen;


// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button'; // Assuming you have a Button component

// const SignInScreen = ({ navigation }) => {
//   const [signInType, setSignInType] = useState('password'); // 'password' or 'otp'
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const identifyInputType = (input) => {
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     const phoneRegex = /^\d{10}$/;

//     if (emailRegex.test(input)) {
//       return 'email';
//     } else if (phoneRegex.test(input)) {
//       return 'phone';
//     } else {
//       return 'unknown';
//     }
//   };

//   const handleSendOtp = () => {
//     const inputType = identifyInputType(emailOrPhone);

//     if (inputType === 'unknown') {
//       Alert.alert('Error', 'Please enter a valid email or phone number.');
//       return;
//     }

//     // Call your API to send OTP
//     console.log('Sending OTP to:', emailOrPhone);

//     // Simulate OTP sent
//     setTimeout(() => {
//       Alert.alert('Success', 'OTP sent successfully.');
//       setIsOtpSent(true);
//     }, 2000);
//   };

//   const handleSignIn = () => {
//     setIsLoading(true);

//     const inputType = identifyInputType(emailOrPhone);

//     if (signInType === 'password') {
//       if (inputType === 'unknown' || !password) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and password.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and password login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('Password:', password);
//     } else if (signInType === 'otp') {
//       if (inputType === 'unknown' || !otp) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and OTP.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and OTP login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('OTP:', otp);
//     }
    
//     // Simulate success
//     setTimeout(() => {
//       Alert.alert('Success', 'Sign in successful.');
//       setIsLoading(false);
//       navigation.navigate('Home'); // Adjust navigation as needed
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Image
//           source={require("../../images/Logo.png")}
//           style={{ width: 100, height: 100, marginLeft: -22, marginTop: 50 }}
//         />
//         <Text style={styles.title}>Sign In</Text>
//         <Text style={styles.description}>
//           Sign in to TravelMates and unlock a world of shared adventures. Connect with fellow travelers, explore new destinations, and share your experiences effortlessly.
//         </Text>

//         <Input
//           id="emailOrPhone"
//           placeholder="Email or Phone Number"
//           placeholderTextColor="white"
//           leftIcon="user"
//           onInputChanged={(id, text) => setEmailOrPhone(text)}
//           value={emailOrPhone}
//           style={styles.input}
//           editable={!isOtpSent || signInType === 'password'}
//         />

//         {signInType === 'password' && (
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             secureTextEntry
//             onInputChanged={(id, text) => setPassword(text)}
//             value={password}
//             style={styles.input}
//           />
//         )}

//         {signInType === 'otp' && isOtpSent && (
//           <Input
//             id="otp"
//             placeholder="OTP"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             keyboardType="numeric"
//             onInputChanged={(id, text) => setOtp(text)}
//             value={otp}
//             style={styles.input}
//           />
//         )}

//         <View style={styles.buttonContainer}>
//           {signInType === 'password' && (
//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//               <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
//             </TouchableOpacity>
//           )}

//           <Button
//             title={signInType === 'password' ? 'Sign In' : 'Send OTP'}
//             onPress={signInType === 'password' ? handleSignIn : handleSendOtp}
//             disabled={isLoading}
//             style={styles.btn}
//           />

//           {signInType === 'otp' && isOtpSent && (
//             <Button
//               title="Sign In"
//               onPress={handleSignIn}
//               disabled={isLoading}
//               style={styles.btn}
//             />
//           )}

//           <TouchableOpacity
//             onPress={() => setSignInType(signInType === 'password' ? 'otp' : 'password')}
//           >
//             <Text style={styles.switchText}>
//               {signInType === 'password' ? 'Sign in with OTP' : 'Sign in with Password'}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.bottomContainer}>
//             <Text style={styles.bottomText}>Don't have an account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//               <Text style={styles.bottomLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2f4f4f',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     color: 'silver',
//     fontSize: 15,
//     textAlign: 'justify',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   switchText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   btn: {
//     width: '80%',
//     marginVertical: 10,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 12,
//   },
//   bottomText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   bottomLink: {
//     color: '#FFD700',
//     fontSize: 16,
//     marginLeft: 5,
//     fontWeight: 'bold',
//   },
//   forgotPasswordLink: {
//     color: '#FFD700',
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
// });

// export default SignInScreen;


// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button'; // Assuming you have a Button component

// const SignInScreen = ({ navigation }) => {
//   const [signInType, setSignInType] = useState('password'); // 'password' or 'otp'
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const identifyInputType = (input) => {
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     const phoneRegex = /^\d{10}$/;

//     if (emailRegex.test(input)) {
//       return 'email';
//     } else if (phoneRegex.test(input)) {
//       return 'phone';
//     } else {
//       return 'unknown';
//     }
//   };

//   const handleSendOtp = () => {
//     const inputType = identifyInputType(emailOrPhone);

//     if (inputType === 'unknown') {
//       Alert.alert('Error', 'Please enter a valid email or phone number.');
//       return;
//     }

//     // Call your API to send OTP
//     console.log('Sending OTP to:', emailOrPhone);

//     // Simulate OTP sent
//     setTimeout(() => {
//       Alert.alert('Success', 'OTP sent successfully.');
//       setIsOtpSent(true);
//     }, 2000);
//   };

//   const handleResendOtp = () => {
//     // Call your API to resend OTP
//     console.log('Resending OTP to:', emailOrPhone);

//     // Simulate OTP resend
//     setTimeout(() => {
//       Alert.alert('Success', 'OTP resent successfully.');
//     }, 2000);
//   };

//   const handleSignIn = () => {
//     setIsLoading(true);

//     const inputType = identifyInputType(emailOrPhone);

//     if (signInType === 'password') {
//       if (inputType === 'unknown' || !password) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and password.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and password login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('Password:', password);
//     } else if (signInType === 'otp') {
//       if (inputType === 'unknown' || !otp) {
//         Alert.alert('Error', 'Please enter a valid email or phone number and OTP.');
//         setIsLoading(false);
//         return;
//       }
//       // Call your API for email/phone and OTP login
//       console.log('Type:', inputType);
//       console.log('Email/Phone:', emailOrPhone);
//       console.log('OTP:', otp);
//     }
    
//     // Simulate success
//     setTimeout(() => {
//       Alert.alert('Success', 'Sign in successful.');
//       setIsLoading(false);
//       navigation.navigate('Home'); // Adjust navigation as needed
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Image
//           source={require("../../images/Logo.png")}
//           style={{ width: 100, height: 100, marginLeft: -22, marginTop: 50 }}
//         />
//         <Text style={styles.title}>Sign In</Text>
//         <Text style={styles.description}>
//           Sign in to TravelMates and unlock a world of shared adventures. Connect with fellow travelers, explore new destinations, and share your experiences effortlessly.
//         </Text>

//         <Input
//           id="emailOrPhone"
//           placeholder="Email or Phone Number"
//           placeholderTextColor="white"
//           leftIcon="user"
//           onInputChanged={(id, text) => setEmailOrPhone(text)}
//           value={emailOrPhone}
//           style={styles.input}
//           editable={!isOtpSent || signInType === 'password'}
//         />

//         {signInType === 'password' && (
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             secureTextEntry
//             onInputChanged={(id, text) => setPassword(text)}
//             value={password}
//             style={styles.input}
//           />
//         )}

//         {signInType === 'otp' && isOtpSent && (
//           <Input
//             id="otp"
//             placeholder="OTP"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             keyboardType="numeric"
//             onInputChanged={(id, text) => setOtp(text)}
//             value={otp}
//             style={styles.input}
//           />
//         )}

//         <View style={styles.buttonContainer}>
//           {signInType === 'password' && (
//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//               <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
//             </TouchableOpacity>
//           )}

//           <Button
//             title={signInType === 'password' ? 'Sign In' : 'Send OTP'}
//             onPress={signInType === 'password' ? handleSignIn : handleSendOtp}
//             disabled={isLoading}
//             style={styles.btn}
//           />

//           {signInType === 'otp' && isOtpSent && (
//             <>
//               <Button
//                 title="Sign In"
//                 onPress={handleSignIn}
//                 disabled={isLoading}
//                 style={styles.btn}
//               />
//               <TouchableOpacity onPress={handleResendOtp}>
//                 <Text style={styles.resendOtpText}>Resend OTP</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           <TouchableOpacity
//             onPress={() => setSignInType(signInType === 'password' ? 'otp' : 'password')}
//           >
//             <Text style={styles.switchText}>
//               {signInType === 'password' ? 'Sign in with OTP' : 'Sign in with Password'}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.bottomContainer}>
//             <Text style={styles.bottomText}>Don't have an account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//               <Text style={styles.bottomLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2f4f4f',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     color: 'silver',
//     fontSize: 15,
//     textAlign: 'justify',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   switchText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   resendOtpText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   btn: {
//     width: '80%',
//     marginVertical: 10,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 12,
//   },
//   bottomText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   bottomLink: {
//     color: '#FFD700',
//     fontSize: 16,
//     marginLeft: 5,
//     fontWeight: 'bold',
//   },
//   forgotPasswordLink: {
//     color: '#FFD700',
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
// });

// export default SignInScreen;
