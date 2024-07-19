// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// import Input from '../../components/Input'; // Adjust the path as needed
// import Button from '../../components/Button';

// const ResetPasswordScreen = ({ route }) => {
// //   const { token } = route.params; // Assume the token is passed from the forgot password process
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleResetPassword = () => {
//     setIsLoading(true);

//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       setIsLoading(false);
//       return;
//     }

//     // Call your API to reset the password
//     console.log('Resetting password with token:', token);
//     console.log('New Password:', newPassword);
//     // Example: fetch('https://your-api.com/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) })

//     // Simulate success
//     setTimeout(() => {
//       Alert.alert('Success', 'Your password has been reset successfully.');
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Text style={styles.title}>Reset Password</Text>
//         <Text style={styles.description}>
//           Enter your new password below.
//         </Text>

//         <Input
//           id="newPassword"
//           placeholder="New Password"
//           placeholderTextColor="white"
//           leftIcon="lock"
//           secureTextEntry
//           onInputChanged={(id, text) => setNewPassword(text)}
//           value={newPassword}
//           style={styles.input}
//         />
//         <Input
//           id="confirmPassword"
//           placeholder="Confirm Password"
//           placeholderTextColor="white"
//           leftIcon="lock"
//           secureTextEntry
//           onInputChanged={(id, text) => setConfirmPassword(text)}
//           value={confirmPassword}
//           style={styles.input}
//         />

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Reset Password"
//             onPress={handleResetPassword}
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

// export default ResetPasswordScreen;

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Input from '../../components/Input'; // Adjust the path as needed
import Button from '../../components/Button';

const ResetPasswordScreen = ({ route }) => {
//   const { emailOrPhone } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setIsLoading(false);
      return;
    }

    // Call your API to reset the password
    console.log('Resetting password for:', emailOrPhone);
    console.log('New Password:', newPassword);
    // Example: fetch('https://your-api.com/reset-password', { method: 'POST', body: JSON.stringify({ emailOrPhone, newPassword }) })

    // Simulate success
    setTimeout(() => {
      Alert.alert('Success', 'Your password has been reset successfully.');
      setIsLoading(false);
      // Navigate to SignIn screen or any other screen
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter your new password below.
        </Text>

        <Input
          id="newPassword"
          placeholder="New Password"
          placeholderTextColor="white"
          leftIcon="lock"
          secureTextEntry
          onInputChanged={(id, text) => setNewPassword(text)}
          value={newPassword}
          style={styles.input}
        />
        <Input
          id="confirmPassword"
          placeholder="Confirm Password"
          placeholderTextColor="white"
          leftIcon="lock"
          secureTextEntry
          onInputChanged={(id, text) => setConfirmPassword(text)}
          value={confirmPassword}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
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

export default ResetPasswordScreen;
