import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TravelPlansScreen = () => {
  // Replace with actual logic to fetch and display user's travel plans

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Plans</Text>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>My Travel Plan</Text>
        <Text style={styles.planDetails}>Destination: Paris</Text>
        <Text style={styles.planDetails}>Date: July 2024</Text>
      </View>
      {/* Add more plan containers as needed */}
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
  planContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planDetails: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default TravelPlansScreen;
