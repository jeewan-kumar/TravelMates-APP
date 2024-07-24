// // screens/SearchScreen.js
// import React, { useState } from 'react';
// import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import SearchBar from '../../components/SearchBar';
// import ResultCard from '../../components/ResultCard';
// import NoResultsMessage from '../../components/NoResultsMessage';

// // Example data
// const sampleData = [
//   { id: '1', name: 'Paris', description: 'The City of Lights', image: 'https://example.com/paris.jpg' },
//   { id: '2', name: 'New York', description: 'The Big Apple', image: 'https://example.com/newyork.jpg' },
//   // Add more items
// ];

// const SearchScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [noResults, setNoResults] = useState(false);

//   const handleSearch = async (query) => {
//     setLoading(true);
//     setNoResults(false);
//     // Simulate API call
//     setTimeout(() => {
//       const filteredResults = sampleData.filter(item =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setResults(filteredResults);
//       setNoResults(filteredResults.length === 0);
//       setLoading(false);
//     }, 1000);
//   };

//   const handlePressResult = (item) => {
//     // Handle result card press
//     console.log('Pressed item:', item);
//   };

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         onSubmitEditing={() => handleSearch(searchQuery)}
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//       ) : noResults ? (
//         <NoResultsMessage />
//       ) : (
//         <FlatList
//           data={results}
//           renderItem={({ item }) => (
//             <ResultCard item={item} onPress={handlePressResult} />
//           )}
//           keyExtractor={item => item.id}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default SearchScreen;

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

const SearchScreen = ({ navigation }) => {
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

export default SearchScreen;