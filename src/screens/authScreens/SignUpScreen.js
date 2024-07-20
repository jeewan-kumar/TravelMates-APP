
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../services/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
  const { signUp, isLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [secureEntry, setSecureEntry] = useState(true);

  useEffect(() => {
    // Reset errors when form data changes
    setErrors({});
  }, [formData]);

  const handleInputChanged = (inputId, inputValue) => {
    setFormData((prevData) => ({ ...prevData, [inputId]: inputValue }));
    validateInput(inputId, inputValue);
  };

  const validateInput = (inputId, inputValue) => {
    let errorMessage = '';

    switch (inputId) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(inputValue)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break;
      case 'phoneNumber':
        if (!/^\d{10}$/.test(inputValue)) {
          errorMessage = 'Please enter a valid phone number.';
        }
        break;
      case 'password':
        if (inputValue.trim().length < 6) {
          errorMessage = 'Password must be at least 6 characters long.';
        }
        break;
      case 'confirmPassword':
        if (inputValue !== formData.password) {
          errorMessage = 'Passwords do not match.';
        }
        break;
      case 'fullName':
        if (inputValue.trim() === '') {
          errorMessage = 'Please enter your full name.';
        }
        break;
      case 'dateOfBirth':
        if (inputValue.trim() === '') {
          errorMessage = 'Please enter your date of birth.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [inputId]: errorMessage }));
  };

  const authHandler = async () => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEmptyFields = Object.values(formData).some((field) => field === '');

    if (hasErrors || hasEmptyFields) {
      Alert.alert('Error', 'Please fill all fields correctly!');
      return;
    }

    try {
      const signUpResponse = await signUp(
        formData.fullName,
        formData.email,
        formData.phoneNumber,
        formData.dateOfBirth,
        formData.password
      );

      if (signUpResponse.success) {
        console.log('signUpResponse',signUpResponse);
        navigation.navigate('VerificationScreen', { 
          user_id: signUpResponse.user_id,
          emailotp_id: signUpResponse.emailotp_id,
          phoneotp_id: signUpResponse.phoneotp_id 
        });
      } else if (signUpResponse.message === 'Duplicate Credentials') {
        Alert.alert('Error', 'Email or phone number already registered');
      } else {
        Alert.alert('Error', signUpResponse.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require("../../images/Logo.png")} style={styles.logo} />
        <Text style={styles.signUpText}>Sign Up</Text>
        <Text style={styles.signUpDescription}>
          Sign up now for free and start connecting with like-minded travelers. Explore new adventures with TravelMates today!
        </Text>
        <View style={styles.formContainer}>
          {[
            { id: 'fullName', placeholder: 'Full Name', icon: 'user' },
            { id: 'email', placeholder: 'Email Address', icon: 'envelope' },
            { id: 'phoneNumber', placeholder: 'Phone number', icon: 'phone' },
            { id: 'dateOfBirth', placeholder: 'Date Of Birth (DD-MM-YYYY)', icon: 'calendar' },
            { id: 'password', placeholder: 'Password', icon: 'lock', secure: true },
            { id: 'confirmPassword', placeholder: 'Confirm Password', icon: 'lock', secure: true },
          ].map((field) => (
            <Input
              key={field.id}
              id={field.id}
              placeholder={field.placeholder}
              placeholderTextColor="white"
              leftIcon={field.icon}
              secureTextEntry={field.secure ? secureEntry : false}
              onInputChanged={handleInputChanged}
              errorText={errors[field.id]}
              rightIcon={
                field.secure && (
                  <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                    <Icon name={secureEntry ? 'eye-slash' : 'eye'} size={20} color="white" />
                  </TouchableOpacity>
                )
              }
              style={styles.input}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Loading...' : 'Sign Up'}
            onPress={authHandler}
            style={styles.btn}
            isLoading={isLoading}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.bottomLink}>Sign In</Text>
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
    paddingBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: -22,
    marginTop: 50,
  },
  signUpText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  signUpDescription: {
    color: 'silver',
    fontSize: 15,
    textAlign: 'justify',
  },
  formContainer: {
    marginVertical: 30,
    width: '80%',
  },
  input: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    marginVertical: 10,
    fontWeight: 'bold',
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
  bottomHalf: {
    flex: 1,
    backgroundColor: '#2f4f4f',
  },
});

export default SignUpScreen;





// import React, { useState, useCallback } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
// import Input from '../../components/Input';
// import Button from '../../components/Button';

// const SignUpScreen = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [fullNameError, setFullNameError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [phoneNumberError, setPhoneNumberError] = useState(false);
//   const [dateOfBirthError, setDateOfBirthError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [confirmPasswordError, setConfirmPasswordError] = useState(false);

//   const handleInputChanged = useCallback((inputId, inputValue) => {
//     let isValid = true;

//     switch (inputId) {
//       case 'email':
//         isValid = /\S+@\S+\.\S+/.test(inputValue);
//         setEmailError(!isValid);
//         setEmail(inputValue);
//         break;
//       case 'phone_number':
//         isValid = /^\d{10}$/.test(inputValue);
//         setPhoneNumberError(!isValid);
//         setPhoneNumber(inputValue);
//         break;
//       case 'password':
//         isValid = inputValue.trim().length >= 6;
//         setPasswordError(!isValid);
//         setPassword(inputValue);
//         break;
//       case 'confirmPassword':
//         isValid = inputValue === password;
//         setConfirmPasswordError(!isValid);
//         setConfirmPassword(inputValue);
//         break;
//       case 'full_Name':
//         setFullName(inputValue);
//         setFullNameError(inputValue.trim() === '');
//         break;
//       case 'date_of_birth':
//         setDateOfBirth(inputValue);
//         setDateOfBirthError(inputValue.trim() === '');
//         break;
//       default:
//         break;
//     }
//   }, [password]);

//   const authHandler = () => {
//     if (
//       fullNameError ||
//       emailError ||
//       phoneNumberError ||
//       dateOfBirthError ||
//       passwordError ||
//       confirmPasswordError ||
//       !fullName ||
//       !email ||
//       !phoneNumber ||
//       !dateOfBirth ||
//       !password ||
//       !confirmPassword
//     ) {
//       alert('Please fill all fields correctly!');
//       return;
//     }
//     console.log('authHandler', { fullName, email, phoneNumber, dateOfBirth, password, confirmPassword });
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#2f4f4f' }}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Image
//           source={require("../../images/Logo.png")}
//           style={{ width: 100, height: 100, marginLeft: -22, marginTop: 50 }}
//         />
//         <Text style={styles.signUpText}>Sign Up</Text>
//         <Text style={styles.signUpDescription}>
//           Sign up now for free and start connecting with like-minded travelers. Explore new adventures with TravelMates today!
//         </Text>
//         <View style={{ marginVertical: 30 }}>
//           <Input
//             id="full_Name"
//             placeholder="Full Name"
//             placeholderTextColor="white"
//             leftIcon="user"
//             onInputChanged={handleInputChanged}
//             errorText={fullNameError && 'Please enter a valid full name.'}
//             style={styles.input}

//           />
//           <Input
//             id="email"
//             placeholder="Email Address"
//             placeholderTextColor="white"
//             leftIcon="envelope"
//             onInputChanged={handleInputChanged}
//             errorText={emailError && 'Please enter a valid email address.'}
//             style={styles.input}
//           />
//           <Input
//             id="phone_number"
//             placeholder="Phone number"
//             placeholderTextColor="white"
//             leftIcon="phone"
//             onInputChanged={handleInputChanged}
//             errorText={phoneNumberError && 'Please enter a valid phone number.'}
//             style={styles.input}
//           />
//           <Input
//             id="date_of_birth"
//             placeholder="Date Of Birth"
//             placeholderTextColor="white"
//             leftIcon="calendar"
//             onInputChanged={handleInputChanged}
//             errorText={dateOfBirthError && 'Please enter your date of birth.'}
//             style={styles.input}
//           />
//           <Input
//             id="password"
//             placeholder="Password"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             secureTextEntry
//             onInputChanged={handleInputChanged}
//             errorText={passwordError && 'Password must be at least 6 characters long.'}
//             style={styles.input}
//           />
//           <Input
//             id="confirmPassword"
//             placeholder="Confirm Password"
//             placeholderTextColor="white"
//             leftIcon="lock"
//             secureTextEntry
//             onInputChanged={handleInputChanged}
//             errorText={confirmPasswordError && 'Passwords do not match.'}
//             style={styles.input}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Sign Up"
//             onPress={authHandler}
//             style={styles.btn}
//           />
//           <View style={styles.bottomContainer}>
//             <Text style={styles.bottomText}>
//               Already Have an account?
//             </Text>
//             <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
//               <Text style={styles.bottomLink}>
//                 Sign In
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//       <View style={styles.bottomHalf} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 50, // Adjust this value to fit the content properly
//   },
//   signUpText: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   signUpDescription: {
//     color: 'silver',
//     fontSize: 15,
//     textAlign: "justify",
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
//     fontWeight: 'bold'
//   },
//   bottomHalf: {
//     flex: 1,
//     backgroundColor: '#2f4f4f',
//   },
//   input: {
//     width: '80%',
//     marginVertical: 10,
//   },
// });

// export default SignUpScreen;
