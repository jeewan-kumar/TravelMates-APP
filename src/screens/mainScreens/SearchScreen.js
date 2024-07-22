// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar';
import ResultCard from '../../components/ResultCard';
import NoResultsMessage from '../../components/NoResultsMessage';

// Example data
const sampleData = [
  { id: '1', name: 'Paris', description: 'The City of Lights', image: 'https://example.com/paris.jpg' },
  { id: '2', name: 'New York', description: 'The Big Apple', image: 'https://example.com/newyork.jpg' },
  // Add more items
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setNoResults(false);
    // Simulate API call
    setTimeout(() => {
      const filteredResults = sampleData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setNoResults(filteredResults.length === 0);
      setLoading(false);
    }, 1000);
  };

  const handlePressResult = (item) => {
    // Handle result card press
    console.log('Pressed item:', item);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => handleSearch(searchQuery)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : noResults ? (
        <NoResultsMessage />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <ResultCard item={item} onPress={handlePressResult} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    marginTop: 20,
  },
});

export default SearchScreen;
