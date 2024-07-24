import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const UserProfileDetails = ({ route, navigation }) => {
  const { profile } = route.params;  // Access the passed profile data

  // Temporary profile data
  const defaultProfile = {
    profilePicture: 'https://via.placeholder.com/150',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    location: 'New York, NY',
  };

  const userProfile = profile || defaultProfile;

  return (
    <View style={styles.container}>
      <Image source={{ uri: userProfile.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
      <Text style={styles.bio}>{userProfile.bio}</Text>
      <Text style={styles.details}>Email: {userProfile.email}</Text>
      <Text style={styles.details}>Phone: {userProfile.phone}</Text>
      <Text style={styles.details}>Location: {userProfile.location}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default UserProfileDetails;

// import React from 'react';
// import { View, Text, Image, StyleSheet, Button } from 'react-native';

// const UserProfileDetails = ({ route, navigation }) => {
//   const { profile } = route.params;  // Access the passed profile data

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: profile.profilePicture }} style={styles.profilePicture} />
//       <Text style={styles.name}>{`${profile.firstName} ${profile.lastName}`}</Text>
//       <Text style={styles.bio}>{profile.bio}</Text>
//       <Text style={styles.details}>Email: {profile.email}</Text>
//       <Text style={styles.details}>Phone: {profile.phone}</Text>
//       <Text style={styles.details}>Location: {profile.location}</Text>
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // Style definitions
// });

// export default UserProfileDetails;
