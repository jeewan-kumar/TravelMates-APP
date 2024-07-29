
// import React, { useState, useCallback, useContext } from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import Input from '../../components/Input';
// import Button from '../../components/Button';
// import { AuthContext } from '../../services/AuthContext';

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

//   const { signUp, isLoading } = useContext(AuthContext);

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

//   const authHandler = async () => {
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

//     try {
//       const signUpResponse = await signUp({ fullName, email, phoneNumber, dateOfBirth, password });
//       if (signUpResponse.success) {
//         navigation.navigate('VerificationScreen', { 
//           user_id: signUpResponse.user_id,
//           emailotp_id: signUpResponse.emailotp_id,
//           phoneotp_id: signUpResponse.phoneotp_id 
//         });
//       } else {
//         alert(signUpResponse.message);
//       }
//     } catch (error) {
//       console.error("Sign-up failed: ", error);
//       alert("Sign-up failed. Please try again.");
//     }
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
          // <Input
          //   id="date_of_birth"
          //   placeholder="Date Of Birth"
          //   placeholderTextColor="white"
          //   leftIcon="calendar"
          //   onInputChanged={handleInputChanged}
          //   errorText={dateOfBirthError && 'Please enter your date of birth.'}
          //   style={styles.input}
          // />
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
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 50,
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
//   input: {
//     width: '80%',
//     marginVertical: 10,
//   },
// });

// export default SignUpScreen;



import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AuthContext } from '../../services/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { signUp, isLoading } = useContext(AuthContext);

  const handleInputChanged = useCallback((inputId, inputValue) => {
    let isValid = true;

    switch (inputId) {
      case 'email':
        isValid = /\S+@\S+\.\S+/.test(inputValue);
        setEmailError(!isValid);
        setEmail(inputValue);
        break;
      case 'phone_number':
        isValid = /^\d{10}$/.test(inputValue);
        setPhoneNumberError(!isValid);
        setPhoneNumber(inputValue);
        break;
      case 'password':
        isValid = inputValue.trim().length >= 6;
        setPasswordError(!isValid);
        setPassword(inputValue);
        break;
      case 'confirmPassword':
        isValid = inputValue === password;
        setConfirmPasswordError(!isValid);
        setConfirmPassword(inputValue);
        break;
      case 'full_Name':
        setFullName(inputValue);
        setFullNameError(inputValue.trim() === '');
        break;
      case 'date_of_birth':
        setDateOfBirth(inputValue);
        setDateOfBirthError(inputValue.trim() === '');
        break;
      default:
        break;
    }
  }, [password]);

  const authHandler = async () => {
    if (
      fullNameError ||
      emailError ||
      phoneNumberError ||
      dateOfBirthError ||
      passwordError ||
      confirmPasswordError ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !password ||
      !confirmPassword
    ) {
      alert('Please fill all fields correctly!');
      return;
    }

    try {
      const signUpResponse = await signUp({ fullName, email, phoneNumber, dateOfBirth, password });
      if (signUpResponse.success) {
        navigation.navigate('VerificationScreen', { 
          user_id: signUpResponse.user_id,
          emailotp_id: signUpResponse.emailotp_id,
          phoneotp_id: signUpResponse.phoneotp_id 
        });
      } else {
        alert(signUpResponse.message);
      }
    } catch (error) {
      console.error("Sign-up failed: ", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    
    setDateOfBirth(formattedDate);
    hideDatePicker();
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../images/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.signUpText}>Sign Up</Text>
        <Text style={styles.signUpDescription}>
          Sign up now for free and start connecting with like-minded travelers. Explore new adventures with TravelMates today!
        </Text>
        <View style={styles.inputWrapper}>
          <Input
            id="full_Name"
            placeholder="Full Name"
            placeholderTextColor="white"
            leftIcon="user"
            onInputChanged={handleInputChanged}
            errorText={fullNameError && 'Please enter a valid full name.'}
            style={styles.input}
          />
          <Input
            id="email"
            placeholder="Email Address"
            placeholderTextColor="white"
            leftIcon="envelope"
            onInputChanged={handleInputChanged}
            errorText={emailError && 'Please enter a valid email address.'}
            style={styles.input}
          />
          <Input
            id="phone_number"
            placeholder="Phone number"
            placeholderTextColor="white"
            leftIcon="phone"
            onInputChanged={handleInputChanged}
            errorText={phoneNumberError && 'Please enter a valid phone number.'}
            style={styles.input}
          />
          
          <View style={styles.datePickerWrapper}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Icon name="calendar" size={20} color="white" style={styles.dateIcon} />
              <Text style={styles.dateText}>{dateOfBirth || "Date of Birth"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Input
            id="password"
            placeholder="Password"
            placeholderTextColor="white"
            leftIcon="lock"
            secureTextEntry
            onInputChanged={handleInputChanged}
            errorText={passwordError && 'Password must be at least 6 characters long.'}
            style={styles.input}
          />
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            placeholderTextColor="white"
            leftIcon="lock"
            secureTextEntry
            onInputChanged={handleInputChanged}
            errorText={confirmPasswordError && 'Passwords do not match.'}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={authHandler}
            style={styles.btn}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.bottomLink}>
                Sign In
              </Text>
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
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: -22,
    marginTop: 50
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  signUpDescription: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  datePickerWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  dateInput: {
    paddingVertical: 10,
  },
  dateText: {
    color:'white',
    // color: dateOfBirth ? 'white' : '#ccc',
    marginLeft:20
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    marginVertical: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: 'white',
  },
  bottomLink: {
    color: '#FFD700',
    marginLeft: 5,
    fontWeight:"bold",
  },
  dateInput: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
});

export default SignUpScreen;