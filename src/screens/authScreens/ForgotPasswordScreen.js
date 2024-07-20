// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button';

// const ForgotPasswordScreen = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleForgotPassword = () => {
//     setIsLoading(true);

//     const emailRegex = /^\S+@\S+\.\S+$/;
//     const phoneRegex = /^\d{10}$/;
//     const isEmail = emailRegex.test(emailOrPhone);
//     const isPhone = phoneRegex.test(emailOrPhone);

//     if (!isEmail && !isPhone) {
//       Alert.alert('Error', 'Please enter a valid email address or phone number.');
//       setIsLoading(false);
//       return;
//     }

//     // Call your API to request a password reset link/code
//     console.log('Requesting password reset for:', emailOrPhone);
//     // Example: fetch('https://your-api.com/forgot-password', { method: 'POST', body: JSON.stringify({ emailOrPhone }) })

//     // Simulate success
//     setTimeout(() => {
//       Alert.alert('Success', 'A password reset link/code has been sent to your email/phone.');
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Text style={styles.title}>Forgot Password</Text>
//         <Text style={styles.description}>
//           Enter your email address or phone number to receive a password reset link or code.
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

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Send Reset Code"
//             onPress={handleForgotPassword}
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

// export default ForgotPasswordScreen;

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button';

const ForgotPasswordScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Get the navigation object

  const handleForgotPassword = () => {
    setIsLoading(true);

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const isEmail = emailRegex.test(emailOrPhone);
    const isPhone = phoneRegex.test(emailOrPhone);

    if (!isEmail && !isPhone) {
      Alert.alert('Error', 'Please enter a valid email address or phone number.');
      setIsLoading(false);
      return;
    }

    // Call your API to request a password reset link/code
    console.log('Requesting password reset for:', emailOrPhone);
    // Example: fetch('https://your-api.com/forgot-password', { method: 'POST', body: JSON.stringify({ emailOrPhone }) })

    // Simulate success
    setTimeout(() => {
      Alert.alert('Success', 'A password reset link/code has been sent to your email/phone.', [
        { text: 'OK', onPress: () => navigation.navigate('VerifyOtpScreen') }, // Navigate to VerifyOtpScreen on button press
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your email address or phone number to receive a password reset link or code.
        </Text>

        <Input
          id="emailOrPhone"
          placeholder="Email or Phone Number"
          placeholderTextColor="white"
          leftIcon="user"
          onInputChanged={(id, text) => setEmailOrPhone(text)}
          value={emailOrPhone}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Send Reset Code"
            onPress={handleForgotPassword}
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

export default ForgotPasswordScreen;
