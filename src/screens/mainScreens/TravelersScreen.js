import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';

const TravelersScreen = ({ route }) => {
  const { destination } = route.params;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);

  const travelersData = [
    { id: '1', name: 'Alice', bio: 'Travel enthusiast. Loves exploring new cultures.', interests: ['Hiking', 'Photography'] },
    { id: '2', name: 'Bob', bio: 'Adventure seeker. Always up for new experiences.', interests: ['Food', 'History'] },
    { id: '3', name: 'Eve', bio: 'Solo traveler. Enjoys meeting new people.', interests: ['Art', 'Music'] },
  ];

  const openProfileModal = (traveler) => {
    setSelectedTraveler(traveler);
    setShowProfileModal(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => openProfileModal(item)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.bio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travelers in {destination.name}</Text>
      <FlatList
        data={travelersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showProfileModal}
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedTraveler?.name}'s Profile</Text>
          <Text>Bio: {selectedTraveler?.bio}</Text>
          <Text>Interests: {selectedTraveler?.interests.join(', ')}</Text>
          <Button title="Close" onPress={() => setShowProfileModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#2f4f4f' 
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 50,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TravelersScreen;
