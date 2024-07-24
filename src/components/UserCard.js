// components/UserCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserCard = ({ name, profilePicture, bio }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#555',
  },
});

export default UserCard;
