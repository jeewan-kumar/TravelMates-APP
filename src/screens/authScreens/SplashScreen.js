
// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet,Text } from 'react-native';


// const SplashScreen = ({ navigation }) => {
//   // Use useEffect to navigate to the next screen after a certain time
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // Navigate to your main screen or initial screen after 2 seconds
//       navigation.replace('Home'); // Replace with your actual screen name
//     }, 2000); // 2000 milliseconds = 2 seconds

//     return () => clearTimeout(timer); // Clear the timer on unmounting
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//      <Text>Heel</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff', // Adjust background color as per your design
//   },
//   logo: {
//     width: 200, // Adjust width and height as per your logo/image dimensions
//     height: 200,
//     resizeMode: 'contain', // Adjust resizeMode as per your image aspect ratio
//   },
// });

// export default SplashScreen;
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../images/background.png')}
      />
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../../images/Logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    alignSelf: 'center',
  },
  splashScreen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
