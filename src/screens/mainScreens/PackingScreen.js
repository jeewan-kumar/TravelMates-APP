import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, CheckBox } from 'react-native';

const initialItems = [
  { id: 1, name: 'Passport', packed: false },
  { id: 2, name: 'Clothes', packed: false },
  { id: 3, name: 'Toiletries', packed: false },
  { id: 4, name: 'Travel Adapter', packed: false },
  { id: 5, name: 'Camera', packed: false }
];

const PackingScreen = () => {
  const [items, setItems] = useState(initialItems);

  const togglePacked = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Packing List</Text>
        {items.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <CheckBox
              value={item.packed}
              onValueChange={() => togglePacked(item.id)}
              style={styles.checkbox}
            />
            <Text style={[styles.itemText, item.packed && styles.packedItem]}>{item.name}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => alert('All items packed')}>
          <Text style={styles.buttonText}>Mark All as Packed</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  packedItem: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PackingScreen;
