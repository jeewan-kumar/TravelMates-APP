// screens/ProfileEditScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

// Dummy data for demonstration; replace with actual API call
const dummyUserData = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone_number: '123-456-7890',
  date_of_birth: '1990-01-01',
  location: 'San Francisco, CA',
  bio: 'Passionate traveler and software engineer.',
  profile_pictures: 'https://example.com/profile.jpg',
};

const ProfileEditScreen = () => {
  const [formData, setFormData] = useState(dummyUserData);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Perform save operation (e.g., API call)
      console.log('Updated user data:', formData);
      // On success:
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile.');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfilePictureUpload
        profilePicture={formData.profile_pictures}
        onImageSelected={(uri) => setFormData({ ...formData, profile_pictures: uri })}
      />
      <InputField
        label="First Name"
        value={formData.first_name}
        onChangeText={(text) => setFormData({ ...formData, first_name: text })}
      />
      <InputField
        label="Last Name"
        value={formData.last_name}
        onChangeText={(text) => setFormData({ ...formData, last_name: text })}
      />
      <InputField
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <InputField
        label="Phone Number"
        value={formData.phone_number}
        onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
      />
      <InputField
        label="Date of Birth"
        value={formData.date_of_birth}
        onChangeText={(text) => setFormData({ ...formData, date_of_birth: text })}
      />
      <InputField
        label="Location"
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />
      <InputField
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => setFormData({ ...formData, bio: text })}
      />
      <Button title="Save" onPress={handleSave} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default ProfileEditScreen;
