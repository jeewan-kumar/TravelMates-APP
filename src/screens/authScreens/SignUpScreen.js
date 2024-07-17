// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import Input from '../../components/Input';

// const SignUpScreen = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();

//   const authHandler = () => {
//     console.log('authHandler');
//     // Perform authentication logic here
//   };

//   const handleInputChanged = (id, text) => {
//     console.log(`Input ${id} changed to ${text}`);
//   };

//   const handleWelcomeScreenPress = () => {
//     // Navigate to WelcomeScreen or perform desired action
//     console.log('Navigate to WelcomeScreen or perform action');
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
//           <Text style={styles.signUpDescription}>
//             Sign up now for free and start connecting with like-minded travelers. Explore new adventures with TravelMates today!
//           </Text>
//         </View>
        
//         <View style={styles.inputField}>
//           <Input
//             id="firstName"
//             placeholder="First Name"
//             placeholderTextColor="white"
//             onInputChanged={handleInputChanged}
//           />
//           <Input
//             id="lastName"
//             placeholder="Last Name"
//             placeholderTextColor="white"
//             onInputChanged={handleInputChanged}
//           />
//           <Input
//             id="email"
//             placeholder="Email Address"
//             placeholderTextColor="white"
//             onInputChanged={handleInputChanged}
//           />
//           <Input
//             id="mobileNo"
//             placeholder="Mobile Number"
//             placeholderTextColor="white"
//             onInputChanged={handleInputChanged}
//           />
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
           
//             onInputChanged={handleInputChanged}
//           />
//           <TouchableOpacity style={styles.signUpButton} onPress={handleWelcomeScreenPress}>
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//           </TouchableOpacity>
          
//           <View style={styles.bottomContainer}>
//             <Text style={{ color: "white" }}>Already have an account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.loginText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//           <Image
//         style={styles.backgroundImage}
//         resizeMode="cover"
//         source={require("../../images/backgroundimg.png")}
//       />
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
//     marginLeft:-300,
//   },
//   signUpText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 30,
//     marginTop: -40,
//     marginLeft:-280
//   },
//   signUpDescription: {
//     color: '#C0C0C0',
//     textAlign: 'center',
//     fontSize: 15,
//     marginVertical: 10,
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
//   loginText: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   }, backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: '50%',
//     opacity: 0.3,
//   },
// });

// export default SignUpScreen;
// SignUpScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleInputChanged = (id, text) => {
    switch (id) {
      case 'firstName':
        setFirstName(text);
        break;
      case 'lastName':
        setLastName(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'mobileNo':
        setMobileNo(text);
        break;
      case 'password':
        setPassword(text);
        break;
      default:
        break;
    }
  };

  const isValidForm = () => {
    return firstName.trim() !== '' &&
           lastName.trim() !== '' &&
           email.trim() !== '' &&
           mobileNo.trim() !== '' &&
           password.trim() !== '';
  };

  const handleWelcomeScreenPress = () => {
    // Validate the form
    if (!isValidForm()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Perform authentication logic here (e.g., API call)
    console.log('Authentication initiated...');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Mobile Number:', mobileNo);
    console.log('Password:', password);

    // Example: Navigate to WelcomeScreen after successful authentication
    navigation.navigate('WelcomeScreen');
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
          <Text style={styles.signUpDescription}>
            Sign up now for free and start connecting with like-minded travelers. Explore new adventures with TravelMates today!
          </Text>
        </View>
        
        <View style={styles.inputField}>
          <Input
            id="firstName"
            placeholder="First Name"
            placeholderTextColor="white"
            value={firstName}
            onInputChanged={handleInputChanged}
            required
          />
          <Input
            id="lastName"
            placeholder="Last Name"
            placeholderTextColor="white"
            value={lastName}
            onInputChanged={handleInputChanged}
            required
          />
          <Input
            id="email"
            placeholder="Email Address"
            placeholderTextColor="white"
            value={email}
            onInputChanged={handleInputChanged}
            required
          />
          <Input
            id="mobileNo"
            placeholder="Mobile Number"
            placeholderTextColor="white"
            value={mobileNo}
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
          <TouchableOpacity style={styles.signUpButton} onPress={handleWelcomeScreenPress}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style={styles.bottomContainer}>
            <Text style={{ color: "white" }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Sign In</Text>
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
  signUpDescription: {
    color: '#C0C0C0',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 10,
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
  loginText: {
    color: 'white',
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
