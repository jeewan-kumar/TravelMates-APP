// screens/TravelPlanDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import TravelDetail from '../../components/TravelDetail';

// Dummy data for demonstration; replace with actual API call
const dummyTravelPlanDetails = {
  destination: 'Paris, France',
  dates: '2024-08-10 to 2024-08-20',
  description: 'A romantic getaway to the city of lights.',
  accommodation: 'Hotel de Paris',
  activities: 'Sightseeing, Wine tasting, Museum tours',
  travelCompanions: [
    { name: 'Alice Johnson', role: 'Friend' },
    { name: 'Bob Smith', role: 'Colleague' },
  ],
  budget: '3000 USD',
  transportation: 'Flight, Public transport',
};

const TravelPlanDetailsScreen = () => {
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with actual API call
    setTimeout(() => {
      setTravelPlan(dummyTravelPlanDetails);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{travelPlan.destination}</Text>
      <TravelDetail label="Dates" value={travelPlan.dates} />
      <TravelDetail label="Description" value={travelPlan.description} />
      <TravelDetail label="Accommodation" value={travelPlan.accommodation} />
      <TravelDetail label="Activities" value={travelPlan.activities} />
      <TravelDetail label="Budget" value={travelPlan.budget} />
      <TravelDetail label="Transportation" value={travelPlan.transportation} />
      <Text style={styles.sectionTitle}>Travel Companions:</Text>
      {travelPlan.travelCompanions.map((companion, index) => (
        <TravelDetail key={index} label={companion.name} value={companion.role} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default TravelPlanDetailsScreen;
