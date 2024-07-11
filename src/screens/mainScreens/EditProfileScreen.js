import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const EditProfileScreen = ({ navigation }) => {
  const [bio, setBio] = useState('Travel enthusiast exploring the world!');
  const [interests, setInterests] = useState(['Adventure', 'Culture', 'Food']);

  const saveProfile = () => {
    // Save updated profile data
    // Example API call or AsyncStorage save
    // Redirect to ProfileScreen
    navigation.goBack(); // Assuming back navigation after save
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        multiline
      />
      <TextInput
        style={styles.input}
        value={interests.join(', ')}
        onChangeText={text => setInterests(text.split(', '))}
        placeholder="Interests (comma-separated)"
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

export default EditProfileScreen;
