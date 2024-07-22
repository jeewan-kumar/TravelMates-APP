// components/TripCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TripCard = ({ trip }) => (
  <View style={styles.card}>
    <Text style={styles.text}>{trip.title} - {trip.date}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default TripCard;
