import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Card from '../../components/Card';
import users from '../../components/users';
import AnimatedStack from '../../components/AnimatedStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Compatible');

  const onSwipeLeft = (user) => {
    console.warn('swipe left', user.id);
  };

  const onSwipeRight = (user) => {
    console.warn('swipe right', user.id);
  };

  const onDoubleTap = (user) => {
    navigation.navigate('UserProfileDetails', { userId: user.id });
  };

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <View style={styles.optionsContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles-sharp" size={22} color="black" />
          </View>
          {['Compatible', 'Active Today', 'New here'].map((opt) => (
            <Pressable
              key={opt}
              onPress={() => setOption(opt)}
              style={[
                styles.optionButton,
                {
                  borderColor: option === opt ? 'transparent' : '#808080',
                  backgroundColor: option === opt ? 'black' : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: option === opt ? 'white' : '#808080' },
                ]}
              >
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
        <AnimatedStack
          data={users}
          renderItem={({ item }) => <Card user={item} onDoubleTap={onDoubleTap} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2f4f4f' 
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  optionsContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Adding top margin
    gap: 10,
    marginLeft:-60,
    fontWeight:'bold'
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',

  },
  optionButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    fontWeight:'bold'
  },
});

export default HomeScreen;

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Image,
//   FlatList,
// } from 'react-native';
// import React, { useEffect, useState, useCallback } from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { profilesData as importedProfilesData } from '../../components/profilesData';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const PROFILE_OPTIONS = ['Compatible', 'Active Today', 'New here'];

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [profilesData, setProfilesData] = useState([]);
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
//   const [option, setOption] = useState(PROFILE_OPTIONS[0]);
//   const [likedProfiles, setLikedProfiles] = useState({});

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   const fetchMatches = async () => {
//     try {
//       setProfilesData(importedProfilesData);

//       // Initialize likedProfiles state with profilesData
//       const initialLikedState = {};
//       importedProfilesData.forEach((profile) => {
//         initialLikedState[profile.id] = false; // Initialize all profiles as not liked
//       });
//       setLikedProfiles(initialLikedState);

//     } catch (error) {
//       console.error('Error fetching matches:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchMatches();
//     }, [])
//   );

//   const navigateToNextProfile = () => {
//     const nextIndex = currentProfileIndex + 1;
//     if (nextIndex < profilesData.length) {
//       setCurrentProfileIndex(nextIndex);
//     } else {
//       console.log('No more profiles');
//     }
//   };

//   const handleLike = (id) => {
//     setLikedProfiles((prev) => ({
//       ...prev,
//       [id]: !prev[id], // Toggle like status
//     }));
//     navigateToNextProfile();
//   };

//   const handleProfilePress = (profile) => {
//     navigation.navigate('UserProfileDetails', { profile });
//   };

//   const renderProfile = ({ item }) => (
//     <View style={styles.profileContainer}>
//       <Pressable onPress={() => handleProfilePress(item)}>
//         <Image source={{ uri: item.photos[0].image }} style={styles.profileImage} />
//       </Pressable>
//       <Text style={styles.profileName}>{item.name}</Text>
//       <Text style={styles.profileDetails}>
//         {item.age} years old, {item.location}
//       </Text>
//       <Text style={styles.profileOccupation}>{item.occupation}</Text>
//       <Pressable onPress={() => handleLike(item.id)} style={styles.likeButton}>
//         <AntDesign
//           name={likedProfiles[item.id] ? 'heart' : 'hearto'}
//           size={25}
//           color={likedProfiles[item.id] ? 'red' : '#C5B358'}
//         />
//       </Pressable>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.optionsContainer}>
//         <View style={styles.iconContainer}>
//           <Ionicons name="sparkles-sharp" size={22} color="black" />
//         </View>
//         {PROFILE_OPTIONS.map((opt) => (
//           <Pressable
//             key={opt}
//             onPress={() => setOption(opt)}
//             style={[
//               styles.optionButton,
//               {
//                 borderColor: option === opt ? 'transparent' : '#808080',
//                 backgroundColor: option === opt ? 'black' : 'transparent',
//               },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.optionText,
//                 { color: option === opt ? 'white' : '#808080' },
//               ]}
//             >
//               {opt}
//             </Text>
//           </Pressable>
//         ))}
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.mainContainer}>
//           <FlatList
//             data={profilesData}
//             renderItem={renderProfile}
//             keyExtractor={(item) => item.id}
//             extraData={likedProfiles} // Ensure FlatList updates when likedProfiles changes
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollView: {
//     marginTop: 0,
//   },
//   mainContainer: {
//     marginHorizontal: 12,
//     marginVertical: 12,
//   },
//   profileImage: {
//     width: '100%',
//     height: 500,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   likeButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'white',
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileContainer: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   profileName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   profileDetails: {
//     fontSize: 16,
//     color: '#555',
//   },
//   profileOccupation: {
//     fontSize: 16,
//     color: '#777',
//     marginTop: 5,
//   },
//   optionsContainer: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     gap: 10,
//     fontWeight: 'bold',
//   },
//   iconContainer: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: '#D0D0D0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   optionButton: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 18,
//   },
//   optionText: {
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;


// import React, { useState } from 'react';
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
// import { profilesData } from '../../components/profilesData';  // Adjust the path according to your file structure

// const HomeScreen = () => {
//   const [expandedProfileId, setExpandedProfileId] = useState(null);
//   const [animation] = useState(new Animated.Value(0));

//   const toggleDetails = (id) => {
//     setExpandedProfileId(expandedProfileId === id ? null : id);
//     Animated.timing(animation, {
//       toValue: expandedProfileId === id ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.profileCard}>
//       <Text style={styles.name}>{item.name}</Text>
      
//       <FlatList
//         data={item.photos}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item.image }} style={styles.photo} />
//         )}
//         keyExtractor={(photo) => photo.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />

//       <TouchableOpacity style={styles.toggleButton} onPress={() => toggleDetails(item.id)}>
//         <Text style={styles.toggleButtonText}>
//           {expandedProfileId === item.id ? 'Hide Details' : 'Show Details'}
//         </Text>
//       </TouchableOpacity>

//       <Animated.View
//         style={[
//           styles.detailsContainer,
//           {
//             height: animation.interpolate({
//               inputRange: [0, 2],
//               outputRange: [0, 200], // Adjust this value based on the expected content height
//             }),
//             opacity: animation.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 1],
//             }),
//           }
//         ]}
//       >
//         {expandedProfileId === item.id && (
//           <>
//             <Text style={styles.detail}>Age: {item.age}</Text>
//             <Text style={styles.detail}>Type: {item.type}</Text>
//             <Text style={styles.detail}>Gender: {item.gender}</Text>
//             <Text style={styles.detail}>Height: {item.height}</Text>
//             <Text style={styles.detail}>Location: {item.location}</Text>
//             <Text style={styles.detail}>Occupation: {item.occupation}</Text>
//             <Text style={styles.detail}>Religion: {item.religion}</Text>
//             <Text style={styles.detail}>Looking For: {item.lookingFor}</Text>
//             <Text style={styles.detail}>Native: {item.native}</Text>
//           </>
//         )}
//       </Animated.View>

//       {item.prompts.map((prompt) => (
//         <View key={prompt.id} style={styles.promptContainer}>
//           <Text style={styles.prompt}>{prompt.prompt}</Text>
//           <Text style={styles.answer}>{prompt.answer}</Text>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <FlatList
//       data={profilesData}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     padding: 15,
//   },
//   photo: {
//     width: Dimensions.get('window').width - 30,
//     height: 500,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   toggleButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   toggleButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   detailsContainer: {
//     paddingHorizontal: 15,
//     paddingBottom: 10,
//     overflow: 'hidden',
//   },
//   detail: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   promptContainer: {
//     paddingHorizontal: 15,
//     marginVertical: 5,
//   },
//   prompt: {
//     fontWeight: 'bold',
//   },
//   answer: {
//     fontSize: 16,
//   },
// });

// export default HomeScreen;

