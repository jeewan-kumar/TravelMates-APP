import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const user = {
    username: 'username',
    email: 'user@example.com',
    bio: 'Travel enthusiast exploring the world!',
    interests: ['Adventure', 'Culture', 'Food'],
  };

  const editProfile = () => {
    // Navigate to EditProfileScreen
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Bio: {user.bio}</Text>
      <Text>Interests: {user.interests.join(', ')}</Text>
      <Button title="Edit Profile" onPress={editProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
