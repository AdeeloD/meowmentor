import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gallery Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#717296',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default GalleryScreen;
