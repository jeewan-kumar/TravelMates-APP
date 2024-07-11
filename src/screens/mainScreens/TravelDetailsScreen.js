import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TravelDetailsScreen = ({ route }) => {
  const { destination, startDate, endDate } = route.params;

  const startChat = () => {
    // Navigate to ChatScreen with destination details
    // Example: navigation.navigate('Chat', { destination });
  };

  const planGroupTravel = () => {
    // Navigate to GroupTravelScreen with destination details
    // Example: navigation.navigate('GroupTravel', { destination });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{destination}</Text>
      <Text>Start Date: {startDate}</Text>
      <Text>End Date: {endDate}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Chat" onPress={startChat} />
        <Button title="Plan Group Travel" onPress={planGroupTravel} />
      </View>
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TravelDetailsScreen;
