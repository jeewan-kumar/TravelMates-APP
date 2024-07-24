// components/ProfilePicture.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ uri }) => {
  return <Image source={{ uri }} style={styles.profilePicture} />;
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007bff',
    marginBottom: 20,
  },
});

export default ProfilePicture;
