import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';

const BASE_URL = 'http://192.168.33.157:5164/TravelMates_Users'; 
const VerificationScreen = ({ route, navigation }) => {
  
  const { user_id, emailotp_id, phoneotp_id } = route.params || {};
  
  // console.log('Route Params:', { user_id, emailotp_id, phoneotp_id });

  // console.log('User ID:', user_id);

  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyOTP = async () => {
    setIsLoading(true);
    const params = {
      eventID: "1002",
      addInfo: {
        user_id,
        emailotp_id, 
        phoneotp_id, 
        email_otp: emailOtp,
        phone_otp: phoneOtp
      }
    };

    try {
      const response = await axios.post(`${BASE_URL}`, params);
      console.log('VerifyOTP Response:', response.data); 
      if (response.data.rStatus === 0 && response.data.rData.rCode === 0) {
        Alert.alert('Success', response.data.rData.rMessage);
        navigation.navigate('SignUpForm');
        // navigation.navigate('Home');
      } else {
        Alert.alert('Error', response.data.rData.rMessage);
      }
    } catch (error) {
      console.error(`OTP verification failed: ${error}`);
      Alert.alert('Error', 'OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!emailOtp || !phoneOtp) {
      Alert.alert('Error', 'Please enter both email and phone OTPs.');
      return;
    }

    verifyOTP();
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
          leftIcon="envelope"
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


// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button';

// const VerificationScreen = ({ route, navigation }) => {
//   const { emailOrPhone } = route.params; // Passed from previous screen
//   const [emailOtp, setEmailOtp] = useState('');
//   const [phoneOtp, setPhoneOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleVerifyOtp = () => {
//     setIsLoading(true);

//     if (!emailOtp || !phoneOtp) {
//       Alert.alert('Error', 'Please enter both email and phone OTPs.');
//       setIsLoading(false);
//       return;
//     }

//     // Call your API to verify OTPs
//     console.log('Email OTP:', emailOtp);
//     console.log('Phone OTP:', phoneOtp);
//     // Example API call:
//     // fetch('https://your-api.com/verify-otp', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ emailOrPhone, emailOtp, phoneOtp })
//     // })

//     // Simulate success
//     setTimeout(() => {
//       Alert.alert('Success', 'OTPs verified successfully.');
//       setIsLoading(false);
//       // Navigate to the next screen, e.g., ResetPassword
//       navigation.navigate('Home', { emailOrPhone });
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Text style={styles.title}>Verify OTP</Text>
//         <Text style={styles.description}>
//           Enter the OTPs sent to your email address and phone number.
//         </Text>

//         <Input
//           id="emailOtp"
//           placeholder="Enter Email OTP"
//           placeholderTextColor="white"
//           leftIcon="envelope"
//           keyboardType="numeric"
//           onInputChanged={(id, text) => setEmailOtp(text)}
//           value={emailOtp}
//           style={styles.input}
//         />
//         <Input
//           id="phoneOtp"
//           placeholder="Enter Phone OTP"
//           placeholderTextColor="white"
//           leftIcon="phone"
//           keyboardType="numeric"
//           onInputChanged={(id, text) => setPhoneOtp(text)}
//           value={phoneOtp}
//           style={styles.input}
//         />

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Verify OTPs"
//             onPress={handleVerifyOtp}
//             disabled={isLoading}
//             style={styles.btn}
//           />
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
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   btn: {
//     width: '80%',
//     marginVertical: 10,
//     fontWeight: 'bold',
//   },
// });

// export default VerificationScreen;
