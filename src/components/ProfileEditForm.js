// components/ProfileEditForm.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import InputField from './InputField';
import Button from './Button';
// import ProfilePictureUpload from './ProfilePictureUpload';

const ProfileEditForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone_number,
    dateOfBirth: user.date_of_birth,
    location: user.location,
    bio: user.bio,
    profilePicture: user.profile_picture,
  });

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    onSave(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ProfilePictureUpload
        profilePicture={formData.profilePicture}
        onImageSelected={(uri) => setFormData({ ...formData, profilePicture: uri })}
      /> */}
      <InputField
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <InputField
        label="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <InputField
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <InputField
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      />
      <InputField
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ProfileEditForm;
