import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ProfileSettingsScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  const saveProfile = () => {
    // Save profile data using API or AsyncStorage
    // Example: API call to update profile
    const profileData = {
      firstName,
      lastName,
      bio,
    };
    // Example API call
    // fetch('https://your-api-endpoint/updateProfile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(profileData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Profile updated successfully:', data);
    //   // Handle success, navigate to previous screen or show confirmation
    // })
    // .catch(error => {
    //   console.error('Error updating profile:', error);
    //   // Handle error, show error message to user
    // });

    // Navigate back to Profile or previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        multiline
      />
      <Button title="Save Profile" onPress={saveProfile} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfileSettingsScreen;
