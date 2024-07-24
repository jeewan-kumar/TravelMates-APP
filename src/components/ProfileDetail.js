// components/ProfileDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileDetail = ({ label, value }) => {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileDetail;
