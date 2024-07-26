import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Input from '../../components/Input'; 
import Button from '../../components/Button'; 
import { AuthContext } from '../../services/AuthContext';

const SignInScreen = ({ navigation }) => {
  const { signIn, sendOtp, verifyOtp, isLoading: authLoading } = useContext(AuthContext);

  const [signInType, setSignInType] = useState('password'); 
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
      return 'phone_number';
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
      const response = await sendOtp(emailOrPhone, inputType === 'email');
      console.log('Send OTP Response:', response);

      if (response.success) {
        Alert.alert('Success', 'OTP sent successfully.');
        setIsOtpSent(true);
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

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await sendOtp(emailOrPhone, identifyInputType(emailOrPhone));
      console.log('Resend OTP Response:', response);

      if (response.success) {
        Alert.alert('Success', 'OTP resent successfully.');
      } else {
        Alert.alert('Error', response.message || 'Failed to resend OTP.');
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
    console.log(identifyInputType);
    console.log(inputType);

    try {
        let response;

        if (signInType === 'password') {
            if (inputType === 'unknown' || !password) {
                Alert.alert('Error', 'Please enter a valid email or phone number and password.');
                return;
            }

            response = await signIn(emailOrPhone, password, inputType === 'email');
            console.log('Sign In Response:', response);
        } else if (signInType === 'otp') {
            if (inputType === 'unknown' || !otp) {
                Alert.alert('Error', 'Please enter a valid email or phone number and OTP.');
                return;
            }

            response = await verifyOtp(emailOrPhone, otp, inputType === 'email');
            console.log('Verify OTP Response:', response);
        }

        if (response.success) {
            Alert.alert('Success', 'Sign in successful.');
            navigation.navigate('Home'); // Adjust navigation as needed
        } else {
            Alert.alert('Error', response.message || 'Sign in failed.');
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
          placeholder="Email or Phone NO"
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
              disabled={isLoading || authLoading}
              style={styles.btn}
            />
          )}

          {signInType === 'otp' && (
            <>
              {!isOtpSent ? (
                <Button
                  title="Send OTP"
                  onPress={handleSendOtp}
                  disabled={isLoading || authLoading}
                  style={styles.btn}
                />
              ) : (
                <>
                  <Button
                    title="Sign In"
                    onPress={handleSignIn}
                    disabled={isLoading || authLoading}
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
    marginTop: 20,
  },
  bottomText: {
    color: 'white',
    fontSize: 16,
  },
  bottomLink: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  forgotPasswordLink: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});

export default SignInScreen;

// import React, { useState, useContext } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Input from '../../components/Input'; 
// import Button from '../../components/Button'; 
// import { AuthContext } from '../../services/AuthContext';

// const API_BASE_URL = 'http://192.168.33.157:5164/TravelMates_SignIn';

// const SignInScreen = ({ navigation }) => {
//   const [signInType, setSignInType] = useState('password'); // 'password' or 'otp'
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { setUserInfo } = useContext(AuthContext);

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

//   const handleSendOtp = async () => {
//     const inputType = identifyInputType(emailOrPhone);

//     if (inputType === 'unknown') {
//       Alert.alert('Error', 'Please enter a valid email or phone number.');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(API_BASE_URL, {
//         eventID: "1002",
//         addInfo: { [inputType === 'email' ? 'email' : 'phone_number']: emailOrPhone }
//       });

//       if (response.data.rData && response.data.rData.rCode === 0) {
//         Alert.alert('Success', 'OTP sent successfully.');
//         setIsOtpSent(true);
//       } else {
//         Alert.alert('Error', response.data.rData.rMessage || 'Failed to send OTP.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', 'Failed to send OTP.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     handleSendOtp();
//   };

//   const handleSignIn = async () => {
//     const inputType = identifyInputType(emailOrPhone);

//     if (inputType === 'unknown') {
//       Alert.alert('Error', 'Please enter a valid email or phone number.');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       let response;

//       if (signInType === 'password') {
//         if (!password) {
//           Alert.alert('Error', 'Please enter a password.');
//           return;
//         }

//         response = await axios.post(API_BASE_URL, {
//           eventID: "1001",
//           addInfo: { [inputType === 'email' ? 'email' : 'phone_number']: emailOrPhone, password }
//         });
//       } else if (signInType === 'otp') {
//         if (!otp) {
//           Alert.alert('Error', 'Please enter the OTP.');
//           return;
//         }

//         response = await axios.post(API_BASE_URL, {
//           eventID: "1003",
//           addInfo: { [inputType === 'email' ? 'email' : 'phone_number']: emailOrPhone, otp }
//         });
//       }

//       if (response.data.rData && response.data.rData.rCode === 0) {
//         Alert.alert('Success', 'Sign in successful.');
//         setUserInfo(response.data); 
//         await AsyncStorage.setItem('userInfo', JSON.stringify(response.data)); // Save user info to AsyncStorage
//         navigation.navigate('Home'); 
//       } else {
//         Alert.alert('Error', response.data.rData.rMessage || 'Sign in failed.');
//       }
//     } catch (error) {
//       console.error('Error signing in:', error);
//       Alert.alert('Error', 'Sign in failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Image
//           source={require("../../images/Logo.png")}
//           style={styles.logo}
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
//           {signInType === 'password' && !isOtpSent && (
//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//               <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
//             </TouchableOpacity>
//           )}

//           {signInType === 'password' && !isOtpSent && (
//             <Button
//               title="Sign In"
//               onPress={handleSignIn}
//               disabled={isLoading}
//               style={styles.btn}
//             />
//           )}

//           {signInType === 'otp' && (
//             <>
//               {!isOtpSent ? (
//                 <Button
//                   title="Send OTP"
//                   onPress={handleSendOtp}
//                   disabled={isLoading}
//                   style={styles.btn}
//                 />
//               ) : (
//                 <>
//                   <Button
//                     title="Sign In"
//                     onPress={handleSignIn}
//                     disabled={isLoading}
//                     style={styles.btn}
//                   />
//                   <TouchableOpacity onPress={handleResendOtp}>
//                     <Text style={styles.resendOtpText}>Resend OTP</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
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
//     alignItems: 'center',
//     padding: 16,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
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
//     textAlign: 'center',
//     marginBottom: 20,
//     width: '85%',
//   },
//   input: {
//     width: '80%',
//     marginVertical: 10,
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
//   forgotPasswordLink: {
//     color: 'white',
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   bottomText: {
//     color: 'silver',
//     fontSize: 15,
//   },
//   bottomLink: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// });

// export default SignInScreen;