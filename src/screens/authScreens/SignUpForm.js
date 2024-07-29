
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const windowWidth = Dimensions.get('window').width;

const SignUpForm = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [base64Image, setBase64Image] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleChangeDate = (date) => {
    const currentDate = date || new Date();
    setShowDatePicker(false);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setUserData({ ...userData, date_of_birth: formattedDate });
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    validateForm();
  }, [userData, base64Image]);

  const fetchUserProfile = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      setUserData(userInfo);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (result.assets && result.assets.length > 0) {
        setBase64Image(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Error choosing image:', error);
    }
  };

  const validateForm = () => {
    const { full_name, date_of_birth, location, gender, travel_preferences, travel_types, traveling_intentions, job_title, workplace, education, religious_beliefs, interests, bio } = userData;
    if (full_name && date_of_birth && location && gender && travel_preferences && travel_types && traveling_intentions && job_title && workplace && education && religious_beliefs && interests && bio && base64Image) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      const params = {
        eventID: '1005',
        addInfo: {
          user_id: userInfo.rData.user_id,
          profile_picture: base64Image,
          full_name: userData.full_name,
          date_of_birth: userData.date_of_birth,
          location: userData.location,
          gender: userData.gender,
          travel_preferences: [userData.travel_preferences],
          travel_types: [userData.travel_types],
          traveling_intentions: [userData.traveling_intentions],
          job_title: userData.job_title,
          workplace: userData.workplace,
          education: userData.education,
          religious_beliefs: userData.religious_beliefs,
          interests: [userData.interests],
          bio: userData.bio,
        },
      };

      const response = await fetch('http://192.168.33.157:5164/TravelMates_UserProfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const resData = await response.json();
        Alert.alert('Success', 'Profile created successfully');
        fetchUserProfile();
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to create profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileCard}>
          <Image
            style={styles.image}
            source={{ uri: base64Image ? `data:image/jpeg;base64,${base64Image}` : '' }}
          />
          <TouchableOpacity style={styles.chooseImageButton} onPress={handleChooseImage}>
            <Text style={styles.chooseImageText}>Choose Image</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="user" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.full_name}
              onChangeText={(text) => setUserData({ ...userData, full_name: text })}
              placeholder="Full Name"
              placeholderTextColor="#f8f8f8"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="calendar" size={20} color="#fff" />
            <TouchableOpacity onPress={showDatePickerModal} style={styles.textInput}>
              <Text style={{ color: '#fff' }}>{selectedDate || 'Date of Birth (yyyy-mm-dd)'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={handleChangeDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="location-pin" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.location}
              onChangeText={(text) => setUserData({ ...userData, location: text })}
              placeholder="Location"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="tag" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.gender}
              onChangeText={(text) => setUserData({ ...userData, gender: text })}
              placeholder="Gender"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="heart" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.travel_preferences}
              onChangeText={(text) => setUserData({ ...userData, travel_preferences: text })}
              placeholder="Travel Preferences"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="plane" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.travel_types}
              onChangeText={(text) => setUserData({ ...userData, travel_types: text })}
              placeholder="Travel Types"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="rocket" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.traveling_intentions}
              onChangeText={(text) => setUserData({ ...userData, traveling_intentions: text })}
              placeholder="Traveling Intentions"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="briefcase" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.job_title}
              onChangeText={(text) => setUserData({ ...userData, job_title: text })}
              placeholder="Job Title"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="organization" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.workplace}
              onChangeText={(text) => setUserData({ ...userData, workplace: text })}
              placeholder="Workplace"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="graduation" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.education}
              onChangeText={(text) => setUserData({ ...userData, education: text })}
              placeholder="Education"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="book-open" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.religious_beliefs}
              onChangeText={(text) => setUserData({ ...userData, religious_beliefs: text })}
              placeholder="Religious Beliefs"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="bulb" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.interests}
              onChangeText={(text) => setUserData({ ...userData, interests: text })}
              placeholder="Interests"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="speech" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              value={userData.bio}
              onChangeText={(text) => setUserData({ ...userData, bio: text })}
              placeholder="Bio"
              placeholderTextColor="#fff"
              multiline
              numberOfLines={3}
            />
          </View>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: isFormValid ? '#4CAF50' : '#A9A9A9' }]}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  chooseImageButton: {
    marginBottom: 20,
  },
  chooseImageText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    padding: 5,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUpForm;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchImageLibrary } from 'react-native-image-picker';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const windowWidth = Dimensions.get('window').width;

// const SignUpForm = ({ navigation}) => {
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [base64Image, setBase64Image] = useState('');
//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     validateForm();
//   }, [userData, base64Image]);

//   const fetchUserProfile = async () => {
//     try {
//       const userInfoString = await AsyncStorage.getItem('userInfo');
//       const userInfo = JSON.parse(userInfoString);
//       console.log(userInfo.rData.user_id)
//       setUserData(userInfo);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleChooseImage = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         includeBase64: true,
//       });

//       if (result.assets && result.assets.length > 0) {
//         setBase64Image(result.assets[0].base64);
//       }
//     } catch (error) {
//       console.error('Error choosing image:', error);
//     }
//   };

//   const validateForm = () => {
//     const { full_name, date_of_birth, location, gender, travel_preferences, travel_types, traveling_intentions, job_title, workplace, education, religious_beliefs, interests, bio } = userData;
//     if (full_name && date_of_birth && location && gender && travel_preferences && travel_types && traveling_intentions && job_title && workplace && education && religious_beliefs && interests && bio && base64Image) {
//       setIsFormValid(true);
//     } else {
//       setIsFormValid(false);
//     }
//   };

//   console.log("validateForm : ",validateForm)
//   console.log("handleChooseImage : ",handleChooseImage)

//   const handleSave = async () => {
//     if (!isFormValid) {
//       Alert.alert('Error', 'Please fill all the fields');
//       return;
//     }

//     try {
//       const userInfoString = await AsyncStorage.getItem('userInfo');
//       const userInfo = JSON.parse(userInfoString);

//       const params = {
//         eventID: '1005',
//         addInfo: {
//           user_id: userInfo.rData.user_id,
//           // user_id: 146,
//           profile_picture: base64Image,
//           full_name: userData.full_name,          
//           date_of_birth: userData.date_of_birth,
//           location: userData.location,
//           gender: userData.gender,
//           travel_preferences: [userData.travel_preferences],
//           travel_types: [userData.travel_types],
//           traveling_intentions: [userData.traveling_intentions],
//           job_title: userData.job_title,
//           workplace: userData.workplace,
//           education: userData.education,
//           religious_beliefs: userData.religious_beliefs,
//           interests: [userData.interests],
//           bio: userData.bio,
//         },
//       };

//       console.log("params : ",params)

//       const response = await fetch('http://192.168.33.157:5164/TravelMates_UserProfiles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(params),
//       });

//       if (response.ok) {
//         const resData = await response.json();
//         Alert.alert('Success', 'Profile created successfully');
//         fetchUserProfile();
//         navigation.navigate('Home');
//       } else {
//         console.error('Failed to create profile:', response.status);
//         Alert.alert('Error', 'Failed to create profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to create profile');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.profileCard}>
//         <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${base64Image}` }} />
//         <TouchableOpacity style={styles.chooseImageButton} onPress={handleChooseImage}>
//           <Text style={styles.chooseImageText}>Choose Image</Text>
//         </TouchableOpacity>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="user" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.full_name}
//             onChangeText={(text) => setUserData({ ...userData, full_name: text })}
//             placeholder="Full Name"
//             placeholderTextColor="#f8f8f8"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="calendar" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.date_of_birth}
//             onChangeText={(text) => setUserData({ ...userData, date_of_birth: text })}
//             placeholder="Date of Birth (yyyy-mm-dd)"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="location-pin" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.location}
//             onChangeText={(text) => setUserData({ ...userData, location: text })}
//             placeholder="Location"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="tag" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.gender}
//             onChangeText={(text) => setUserData({ ...userData, gender: text })}
//             placeholder="Gender"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="heart" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.travel_preferences}
//             onChangeText={(text) => setUserData({ ...userData, travel_preferences: text })}
//             placeholder="Travel Preferences"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="plane" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.travel_types}
//             onChangeText={(text) => setUserData({ ...userData, travel_types: text })}
//             placeholder="Travel Types"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="rocket" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.traveling_intentions}
//             onChangeText={(text) => setUserData({ ...userData, traveling_intentions: text })}
//             placeholder="Traveling Intentions"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="briefcase" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.job_title}
//             onChangeText={(text) => setUserData({ ...userData, job_title: text })}
//             placeholder="Job Title"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="organization" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.workplace}
//             onChangeText={(text) => setUserData({ ...userData, workplace: text })}
//             placeholder="Workplace"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="graduation" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.education}
//             onChangeText={(text) => setUserData({ ...userData, education: text })}
//             placeholder="Education"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="book-open" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.religious_beliefs}
//             onChangeText={(text) => setUserData({ ...userData, religious_beliefs: text })}
//             placeholder="Religious Beliefs"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="bulb" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.interests}
//             onChangeText={(text) => setUserData({ ...userData, interests: text })}
//             placeholder="Interests"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name="speech" size={20} color="#fff" />
//           <TextInput
//             style={styles.textInput}
//             value={userData.bio}
//             onChangeText={(text) => setUserData({ ...userData, bio: text })}
//             placeholder="Bio"
//             placeholderTextColor="#fff"
//           />
//         </View>
//         <TouchableOpacity
//           style={[styles.saveButton, isFormValid ? styles.saveButtonEnabled : styles.saveButtonDisabled]}
//           onPress={handleSave}
//           disabled={!isFormValid}
//         >
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingVertical: 20,
//     alignItems: 'center',
//     backgroundColor: '#2f4f4f',
//   },
//   profileCard: {
//     width: windowWidth * 0.9,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#2f4f4f',
//     elevation: 3,
//     shadowColor: '#2f4f4f',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 50,
//     marginBottom: 20,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//   },
//   chooseImageButton: {
//     backgroundColor: '#ccc',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//     marginBottom: 16,
//   },
//   chooseImageText: {
//     fontSize: 14,
//     color: '#fff',
//     textAlign:'center',
//     fontWeight:'bold'
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   textInput: {
//     flex: 1,
//     marginLeft: 10,
//     paddingVertical: 5,
//     color: '#fff',
//   },
//   saveButton: {
//     marginTop: 20,
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   saveButtonEnabled: {
//     backgroundColor: '#1E90FF',
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#aaa',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default SignUpForm;
