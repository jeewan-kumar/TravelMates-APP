// components/DestinationCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DestinationCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 180,
    height: 120,
  },
  name: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DestinationCard;
