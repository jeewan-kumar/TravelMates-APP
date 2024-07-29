// screens/TravelPlanScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import TravelCard from '../../components/TravelCard';
import UserCard from '../../components/UserCard';

// Dummy data for demonstration; replace with actual API call
const dummyTravelPlans = [
  {
    id: 1,
    destination: 'Delhi',
    dates: '2024-08-10 to 2024-08-20',
    description: 'A romantic getaway to the city of lights.',
  },
  {
    id: 2,
    destination: 'Gurugram',
    dates: '2024-09-15 to 2024-09-25',
    description: 'Exploring the historic temples and gardens.',
  },
  {
    id: 3,
    destination: 'Bihar',
    dates: '2024-09-15 to 2024-09-25',
    description: 'Exploring the historic temples and gardens.',
  },
  {
    id: 4,
    destination: 'Noida',
    dates: '2024-09-15 to 2024-09-25',
    description: 'Exploring the historic temples and gardens.',
  },
  {
    id: 5,
    destination: 'Noida',
    dates: '2024-09-15 to 2024-09-25',
    description: 'Exploring the historic temples and gardens.',
  },
  
];

const dummyUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    profilePicture: 'https://example.com/alice.jpg',
    bio: 'Love traveling and meeting new people.',
  },
  {
    id: 2,
    name: 'Bob Smith',
    profilePicture: 'https://example.com/bob.jpg',
    bio: 'Adventure enthusiast and food lover.',
  },
];

const TravelPlanScreen = ({ navigation }) => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with actual API calls
    setTimeout(() => {
      setTravelPlans(dummyTravelPlans);
      setUsers(dummyUsers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {travelPlans.map((plan) => (
        <TravelCard
          key={plan.id}
          id={plan.id}
          destination={plan.destination}
          dates={plan.dates}
          description={plan.description}
          navigation={navigation}
        />
      ))}
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          profilePicture={user.profilePicture}
          bio={user.bio}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2f4f4f' 
  },
});

export default TravelPlanScreen;
