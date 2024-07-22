// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Dummy data for demonstration; replace with actual API call
const dummyUserData = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone_number: '123-456-7890',
  date_of_birth: '1990-01-01',
  location: 'San Francisco, CA',
  gender: 'Male',
  sexuality: 'Straight',
  travel_preferences: 'Beach, Adventure',
  travel_types: 'Solo, Group',
  traveling_intentions: 'Leisure, Exploration',
  children_status: 'No',
  family_details: 'Single, no children',
  hometown: 'Los Angeles, CA',
  job_title: 'Software Engineer',
  workplace: 'TechCorp',
  education: 'Bachelor\'s in Computer Science',
  political_beliefs: 'Liberal',
  religious_beliefs: 'Agnostic',
  highest_education_level: 'Bachelor\'s Degree',
  drinking_habits: 'Socially',
  smoking_tobacco: 'No',
  smoking_weed: 'Occasionally',
  drug_use: 'No',
  workout_habits: 'Regularly',
  pets: 'Dog',
  interests: 'Traveling, Coding, Hiking',
  values_in_person: 'Honesty, Kindness',
  profile_pictures: 'https://example.com/profile.jpg',
  bio: 'Passionate traveler and software engineer.',
};

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Replace this with actual API call
    setTimeout(() => {
      setUser(dummyUserData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.profile_pictures }} style={styles.profilePicture} />
      <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.detail}>Phone: {user.phone_number}</Text>
      <Text style={styles.detail}>Date of Birth: {user.date_of_birth}</Text>
      <Text style={styles.detail}>Location: {user.location}</Text>
      <Text style={styles.detail}>Gender: {user.gender}</Text>
      <Text style={styles.detail}>Sexuality: {user.sexuality}</Text>
      <Text style={styles.detail}>Travel Preferences: {user.travel_preferences}</Text>
      <Text style={styles.detail}>Travel Types: {user.travel_types}</Text>
      <Text style={styles.detail}>Traveling Intentions: {user.traveling_intentions}</Text>
      <Text style={styles.detail}>Children Status: {user.children_status}</Text>
      <Text style={styles.detail}>Family Details: {user.family_details}</Text>
      <Text style={styles.detail}>Hometown: {user.hometown}</Text>
      <Text style={styles.detail}>Job Title: {user.job_title}</Text>
      <Text style={styles.detail}>Workplace: {user.workplace}</Text>
      <Text style={styles.detail}>Education: {user.education}</Text>
      <Text style={styles.detail}>Political Beliefs: {user.political_beliefs}</Text>
      <Text style={styles.detail}>Religious Beliefs: {user.religious_beliefs}</Text>
      <Text style={styles.detail}>Highest Education Level: {user.highest_education_level}</Text>
      <Text style={styles.detail}>Drinking Habits: {user.drinking_habits}</Text>
      <Text style={styles.detail}>Smoking Tobacco: {user.smoking_tobacco}</Text>
      <Text style={styles.detail}>Smoking Weed: {user.smoking_weed}</Text>
      <Text style={styles.detail}>Drug Use: {user.drug_use}</Text>
      <Text style={styles.detail}>Workout Habits: {user.workout_habits}</Text>
      <Text style={styles.detail}>Pets: {user.pets}</Text>
      <Text style={styles.detail}>Interests: {user.interests}</Text>
      <Text style={styles.detail}>Values in Person: {user.values_in_person}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Icon
        name="edit"
        size={30}
        color="#007bff"
        style={styles.editIcon}
        onPress={() => navigation.navigate('ProfileEdit')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007bff',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  editIcon: {
    marginTop: 20,
  },
});

export default ProfileScreen;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserProfile } from '../store/userSlice';

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.user.profile);
//   const [firstName, setFirstName] = useState(profile.firstName || '');
//   const [lastName, setLastName] = useState(profile.lastName || '');
//   const [email, setEmail] = useState(profile.email || '');
//   const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '');

//   const saveProfile = () => {
//     const updatedProfile = { firstName, lastName, email, phoneNumber };
//     dispatch(setUserProfile(updatedProfile));
//     // Add API call to save profile to the backend
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Profile Screen</Text>
//       <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
//       <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
//       <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
//       <Button title="Save Profile" onPress={saveProfile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default ProfileScreen;
