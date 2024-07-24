// components/EditButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Icon name="edit" size={20} color="#fff" />
      <Text style={styles.editButtonText}>Edit Profile</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default EditButton;
