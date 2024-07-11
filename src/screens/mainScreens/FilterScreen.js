import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';

const FilterScreen = ({ navigation }) => {
  const [genderFilter, setGenderFilter] = useState(false);
  const [ageFilter, setAgeFilter] = useState(false);

  const applyFilters = () => {
    // Logic to apply filters and fetch updated data from API
    // Example: navigation.navigate('Discover', { filters: { genderFilter, ageFilter } });
    navigation.goBack(); // Navigate back after applying filters
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      <View style={styles.filterItem}>
        <Text>Gender</Text>
        <Switch
          value={genderFilter}
          onValueChange={value => setGenderFilter(value)}
        />
      </View>
      <View style={styles.filterItem}>
        <Text>Age</Text>
        <Switch
          value={ageFilter}
          onValueChange={value => setAgeFilter(value)}
        />
      </View>
      <Button title="Apply Filters" onPress={applyFilters} />
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
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FilterScreen;
