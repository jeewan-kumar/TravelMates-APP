import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const mockMatches = [
  { id: '1', name: 'Alice', image: 'https://example.com/alice.jpg', bio: 'Travel enthusiast and foodie.' },
  { id: '2', name: 'Bob', image: 'https://example.com/bob.jpg', bio: 'Adventure seeker and nature lover.' },
  { id: '3', name: 'Carol', image: 'https://example.com/carol.jpg', bio: 'Culture and history buff.' },
];

const MatchScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMatches(mockMatches);
      setFilteredMatches(mockMatches);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const results = mockMatches.filter(item =>
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.bio.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMatches(results);
  };

  const navigateToProfile = (item) => {
    // Navigate to the profile screen with item details
    navigation.navigate('UserProfileDetails', { user: item });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for matches"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {filteredMatches.length > 0 ? (
        <FlatList
          data={filteredMatches}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.matchCard} onPress={() => navigateToProfile(item)}>
              <Image source={{ uri: item.image }} style={styles.profileImage} />
              <View style={styles.matchInfo}>
                <Text style={styles.matchName}>{item.name}</Text>
                <Text style={styles.matchBio}>{item.bio}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResultsText}>No matches found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    padding: 16,
  },
  searchInput: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2,
    fontSize: 16,
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchBio: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default MatchScreen;
