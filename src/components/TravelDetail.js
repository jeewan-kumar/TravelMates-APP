// components/TravelDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TravelDetail = ({ label, value }) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  value: {
    color: '#555',
  },
});

export default TravelDetail;
