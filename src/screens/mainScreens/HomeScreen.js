
// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DestinationCard from '../../components/DestinationCard';
import TripCard from '../../components/TripCard';
import ChatCard from '../../components/ChatCard';
import NavigationButton from '../../components/NavigationButton';

const mockDestinations = [
  { id: '1', name: 'Paris', image: 'https://example.com/paris.jpg' },
  { id: '2', name: 'New York', image: 'https://example.com/newyork.jpg' },
  { id: '3', name: 'Tokyo', image: 'https://example.com/tokyo.jpg' },
];

const mockTrips = [
  { id: '1', title: 'Trip to Paris', date: '2024-09-15' },
  { id: '2', title: 'Trip to Tokyo', date: '2024-10-10' },
];

const mockChats = [
  { id: '1', title: 'Chat with Alex' },
  { id: '2', title: 'Chat with Jamie' },
];

const mockFeaturedDestinations = [
  { id: '1', name: 'Sydney', image: 'https://example.com/sydney.jpg' },
  { id: '2', name: 'London', image: 'https://example.com/london.jpg' },
];

const HomeScreen = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User'); // Mock user name

  useEffect(() => {
    setTimeout(() => {
      setDestinations(mockDestinations);
      setUpcomingTrips(mockTrips);
      setRecentChats(mockChats);
      setFeaturedDestinations(mockFeaturedDestinations);
      setLoading(false);
    }, 1000);
  }, []);

  const navigateTo = (screen) => {
    console.log(`Navigate to ${screen}`);
    // Implement actual navigation
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for destinations or trips"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Destinations</Text>
        <FlatList
          data={destinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DestinationCard
              item={item}
              onPress={() => navigateTo('DestinationDetail')}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Destinations</Text>
        <FlatList
          data={featuredDestinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DestinationCard
              item={item}
              onPress={() => navigateTo('DestinationDetail')}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        {upcomingTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        <FlatList
          data={recentChats}
          renderItem={({ item }) => (
            <ChatCard
              chat={item}
              onPress={() => navigateTo('ChatDetail')}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.navigationButtons}>
        <NavigationButton title="Search Destinations" onPress={() => navigateTo('Search')} />
        <NavigationButton title="My Profile" onPress={() => navigateTo('Profile')} />
        <NavigationButton title="Chat" onPress={() => navigateTo('Chat')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  navigationButtons: {
    marginTop: 20,
  },
});

export default HomeScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const BASE_URL = 'http://192.168.33.157:5164'; // Update with your API base URL

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [destinations, setDestinations] = useState([]);
//   const [upcomingTrips, setUpcomingTrips] = useState([]);
//   const [recentChats, setRecentChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState(''); // Assume you get user's name from context or API

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [destRes, tripsRes, chatsRes] = await Promise.all([
//           axios.get(`${BASE_URL}/destinations`),
//           axios.get(`${BASE_URL}/upcoming-trips`),
//           axios.get(`${BASE_URL}/recent-chats`)
//         ]);

//         setDestinations(destRes.data);
//         setUpcomingTrips(tripsRes.data);
//         setRecentChats(chatsRes.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const navigateTo = (screen) => {
//     navigation.navigate(screen);
//   };

//   const renderDestination = ({ item }) => (
//     <TouchableOpacity
//       style={styles.destinationCard}
//       onPress={() => navigateTo('DestinationDetail')}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.destinationImage}
//       />
//       <Text style={styles.destinationName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderChat = ({ item }) => (
//     <TouchableOpacity
//       style={styles.chatCard}
//       onPress={() => navigateTo('ChatDetail')}
//     >
//       <Text style={styles.chatText}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Explore Destinations</Text>
//         <FlatList
//           data={destinations}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={renderDestination}
//           keyExtractor={(item) => item.id}
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Upcoming Trips</Text>
//         {upcomingTrips.map((trip) => (
//           <View key={trip.id} style={styles.tripCard}>
//             <Text style={styles.tripText}>{trip.title} - {trip.date}</Text>
//           </View>
//         ))}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recent Chats</Text>
//         <FlatList
//           data={recentChats}
//           renderItem={renderChat}
//           keyExtractor={(item) => item.id}
//         />
//       </View>

//       <View style={styles.navigationButtons}>
//         <TouchableOpacity style={styles.button} onPress={() => navigateTo('Search')}>
//           <Text style={styles.buttonText}>Search Destinations</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigateTo('Profile')}>
//           <Text style={styles.buttonText}>My Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigateTo('Chat')}>
//           <Text style={styles.buttonText}>Chat</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   destinationCard: {
//     marginRight: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     elevation: 3,
//   },
//   destinationImage: {
//     width: 180,
//     height: 120,
//   },
//   destinationName: {
//     padding: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   tripCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   tripText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   chatCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   chatText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   navigationButtons: {
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Explore Destinations</Text>
//       <Button
//         title="View Destinations"
//         onPress={() => navigation.navigate('Destinations')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;
