// components/NoResultsMessage.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const NoResultsMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No results found. Try a different search term.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#808080',
  },
});

export default NoResultsMessage;
