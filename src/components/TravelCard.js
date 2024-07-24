// components/TravelCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TravelCard = ({ id, destination, dates, description, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TravelPlanDetailsScreen', { travelPlanId: id })}
    >
      <View>
        <Text style={styles.destination}>{destination}</Text>
        <Text style={styles.dates}>{dates}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dates: {
    color: '#555',
    marginVertical: 5,
  },
  description: {
    color: '#777',
  },
});

export default TravelCard;
