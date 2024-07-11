import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfileScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {user.firstName} {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Bio: {user.bio}</Text>
      {/* Add more profile details as needed */}
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

export default UserProfileScreen;
