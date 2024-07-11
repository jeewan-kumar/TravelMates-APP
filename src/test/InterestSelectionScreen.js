import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const interests = [
  'Country', 'Cats', 'Coffee', 'Yoga', 'Hiking trips', 'Vegetarian',
  'Camping', 'LGBTQ+ rights', 'Horror', 'Crafts', 'Museums & galleries',
  'Tennis', 'R&B', 'Baking', 'Festivals', 'Wine'
];

const InterestSelectionScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const renderInterest = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.interestButton, 
        selectedInterests.includes(item) && styles.selectedInterestButton
      ]}
      onPress={() => toggleInterest(item)}
    >
      <Text style={[
        styles.interestText, 
        selectedInterests.includes(item) && styles.selectedInterestText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose 5 things you’re really into</Text>
      <Text style={styles.subtitle}>
        Proud foodie or big on bouldering? Add interests to your profile to help you match with people who love them too.
      </Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="What are you into?"
      />
      <FlatList
        data={interests}
        renderItem={renderInterest}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.interestsContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.skipText}>Skip</Text>
        <Text>{selectedInterests.length}/5 selected</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  interestsContainer: {
    justifyContent: 'space-between',
  },
  interestButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
  },
  selectedInterestButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  interestText: {
    fontSize: 14,
  },
  selectedInterestText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  skipText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default InterestSelectionScreen;
