// import React, { useState } from 'react';
// import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
// import Card from '../../components/Card';
// import users from '../../components/users';
// import AnimatedStack from '../../components/AnimatedStack';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [option, setOption] = useState('Compatible');

//   const onSwipeLeft = (user) => {
//     console.warn('swipe left', user.id);
//   };

//   const onSwipeRight = (user) => {
//     console.warn('swipe right', user.id);
//   };

//   const onDoubleTap = (user) => {
//     navigation.navigate('UserProfileDetails', { userId: user.id });
//   };

//   return (
//     <GestureHandlerRootView style={styles.pageContainer}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.optionsContainer}>
//           <View style={styles.iconContainer}>
//             <Ionicons name="sparkles-sharp" size={22} color="black" />
//           </View>
//           {['Compatible', 'Active Today', 'New here'].map((opt) => (
//             <Pressable
//               key={opt}
//               onPress={() => setOption(opt)}
//               style={[
//                 styles.optionButton,
//                 {
//                   borderColor: option === opt ? 'transparent' : '#808080',
//                   backgroundColor: option === opt ? 'black' : 'transparent',
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   { color: option === opt ? 'white' : '#808080' },
//                 ]}
//               >
//                 {opt}
//               </Text>
//             </Pressable>
//           ))}
//         </View>
//         <AnimatedStack
//           data={users}
//           renderItem={({ item }) => <Card user={item} onDoubleTap={onDoubleTap} />}
//           onSwipeLeft={onSwipeLeft}
//           onSwipeRight={onSwipeRight}
//         />
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     alignItems: 'center',
//   },
//   optionsContainer: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20, // Adding top margin
//     gap: 10,
//     marginLeft:-60,
//     fontWeight:'bold'
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
//     fontWeight: '400',
//     fontWeight:'bold'
//   },
// });

// export default HomeScreen;


// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Image,
// } from 'react-native';
// import React, { useEffect, useState, useCallback } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import Entypo from 'react-native-vector-icons/Entypo';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [option, setOption] = useState('Compatible');
//   const [profilesData, setProfilesData] = useState([]);

//   const [userId, setUserId] = useState('');


//   console.log('userId', userId);

//   // const showToken = async () => {
//   //   const token = await AsyncStorage.getItem('tebsersl');
//   //   console.log('token', token);
//   // };
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
//   // const [currentProfile, setCurrentProfile] = useState(profiles[0]);
//   const [currentProfile, setCurrentProfile] = useState(profilesData[0]);
//   const handleLike = () => {
//     // Handle liking the current profile
//     // You can implement additional logic here, such as updating the liked profile list
//     // For now, just move to the next profile
//     navigateToNextProfile();
//   };

//   const handleCross = () => {
//     // Handle crossing the current profile
//     // You can implement additional logic here, such as updating the crossed profile list
//     // For now, just move to the next profile
//     navigateToNextProfile();
//   };

//   const navigateToNextProfile = () => {
//     const nextIndex = currentProfileIndex + 1;
//     if (nextIndex <= profilesData.length) {
//       setCurrentProfileIndex(nextIndex);
//       setCurrentProfile(profilesData[nextIndex]);
//       navigation.navigate('Animation');
//     } else {
//       // No more profiles to display
//       console.log('No more profiles');
//     }
//   };
//   console.log('next index', currentProfileIndex);

//   // useEffect(() => {
//   //   showToken();
//   // }, []);

//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/matches?userId=${11}`,
//       );
//       const matches = response.data.matches;
//       setProfilesData(matches);
//       // Handle matches in the frontend (display, store in state, etc.)
//     } catch (error) {
//       console.error('Error fetching matches:', error);
//       // Handle error in the frontend
//     }
//   };
//   useEffect(() => {
//     // Update currentProfile when profilesData changes
//     if (profilesData.length > 0) {
//       setCurrentProfile(profilesData[0]);
//     }
//   }, [profilesData]);

//   useEffect(() => {
//     if (userId) {
//       fetchMatches();
//     }
//   }, [userId]);
//   useFocusEffect(
//     useCallback(() => {
//       console.log('i call');
//       if (userId) {
//         fetchMatches();
//       }
//     }, [userId]),
//   );
//   console.log('matches', profilesData);
//   return (
//     <>
//       <ScrollView style={{ marginTop: 55 }}>

//         <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
//           {/* {profiles?.map((item, index) => ( */}
//           <>
//             <View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 10,
//                   }}>
//                   <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
//                     {currentProfile?.firstName}
//                   </Text>
//                   <View
//                     style={{
//                       backgroundColor: '#452c63',
//                       paddingHorizontal: 12,
//                       paddingVertical: 4,
//                       borderRadius: 20,
//                     }}>
//                     <Text style={{ textAlign: 'center', color: 'white' }}>
//                       new here
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 15,
//                   }}>
//                   <Entypo
//                     name="dots-three-horizontal"
//                     size={22}
//                     color="black"
//                   />
//                 </View>
//               </View>

//               <View style={{ marginVertical: 15 }}>
//                 <View>
//                   {currentProfile?.imageUrls?.length > 0 && (
//                     <View>
//                       <Image
//                         style={{
//                           width: '100%',
//                           height: 350,
//                           resizeMode: 'cover',
//                           borderRadius: 10,
//                         }}
//                         source={{
//                           uri: currentProfile?.imageUrls[0],
//                         }}
//                       />
//                       <Pressable
//                         onPress={() =>
//                           navigation.navigate('SendLike', {
//                             image: currentProfile?.imageUrls[0],
//                             name: currentProfile?.firstName,
//                             userId: userId,
//                             likedUserId: currentProfile?._id,
//                           })
//                         }
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </Pressable>
//                     </View>
//                   )}
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                   {currentProfile?.prompts.slice(0, 1).map(prompt => (
//                     <>
//                       <View
//                         key={prompt.id}
//                         style={{
//                           backgroundColor: 'white',
//                           padding: 12,
//                           borderRadius: 10,
//                           height: 150,
//                           justifyContent: 'center',
//                         }}>
//                         <Text style={{ fontSize: 15, fontWeight: '500' }}>
//                           {prompt.question}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 20,
//                             fontWeight: '600',
//                             marginTop: 20,
//                           }}>
//                           {prompt.answer}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           shadowColor: '#000',
//                           shadowOffset: { width: 0, height: 1 },
//                           shadowOpacity: 0.25,
//                           shadowRadius: 3.84,
//                           // Shadow properties for Android
//                           elevation: 5,
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </View>
//                     </>
//                   ))}
//                 </View>

//                 {/* profile details to come here */}
//                 <View
//                   style={{
//                     backgroundColor: 'white',
//                     padding: 10,
//                     borderRadius: 8,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: 5,
//                       alignItems: 'center',
//                       gap: 20,
//                       borderBottomWidth: 0.8,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 10,
//                       }}>
//                       <MaterialCommunityIcons
//                         name="cake-variant-outline"
//                         size={22}
//                         color="black"
//                       />
//                       <Text style={{ fontSize: 15 }}>23</Text>
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 10,
//                       }}>
//                       <Ionicons name="person-outline" size={20} color="black" />
//                       <Text style={{ fontSize: 15 }}>
//                         {currentProfile?.gender}
//                       </Text>
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 10,
//                       }}>
//                       <Ionicons name="magnet-outline" size={20} color="black" />
//                       <Text style={{ fontSize: 15 }}>{currentProfile?.type}</Text>
//                     </View>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 10,
//                       }}>
//                       <Octicons name="home" size={20} color="black" />
//                       <Text style={{ fontSize: 15 }}>{currentProfile?.hometown}</Text>
//                     </View>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.8,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <Ionicons name="bag-add-outline" size={20} color="black" />
//                     <Text>Research Assistant at Medical College</Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.8,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <SimpleLineIcons
//                       name="graduation"
//                       size={22}
//                       color="black"
//                     />
//                     <Text>University of Bangalore</Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.8,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <Ionicons name="book-outline" size={20} color="black" />
//                     <Text>Hindu</Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.8,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <Ionicons name="home-outline" size={20} color="black" />
//                     <Text>Mathura</Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.7,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <Feather name="search" size={20} color="black" />
//                     <Text>{currentProfile?.lookingFor}</Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       gap: 12,
//                       marginTop: 15,
//                       borderBottomWidth: 0.7,
//                       borderBottomColor: '#E0E0E0',
//                       paddingBottom: 10,
//                     }}>
//                     <Ionicons name="heart-outline" size={20} color="black" />
//                     <Text>Monogamy</Text>
//                   </View>
//                 </View>

//                 <View>
//                   {currentProfile?.imageUrls?.slice(1, 3).map((item, index) => (
//                     <View key={index} style={{ marginVertical: 10 }}>
//                       <Image
//                         style={{
//                           width: '100%',
//                           height: 350,
//                           resizeMode: 'cover',
//                           borderRadius: 10,
//                         }}
//                         source={{
//                           uri: item,
//                         }}
//                       />

//                       <Pressable
//                         onPress={() =>
//                           navigation.navigate('SendLike', {
//                             image: currentProfile?.imageUrls[index + 1],
//                             name: currentProfile?.firstName,
//                             userId: userId,
//                             likedUserId: currentProfile?._id,
//                           })
//                         }
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </Pressable>
//                     </View>
//                   ))}
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                   {currentProfile?.prompts.slice(1, 2).map(prompt => (
//                     <>
//                       <View
//                         key={prompt.id}
//                         style={{
//                           backgroundColor: 'white',
//                           padding: 12,
//                           borderRadius: 10,
//                           height: 150,
//                           justifyContent: 'center',
//                         }}>
//                         <Text style={{ fontSize: 15, fontWeight: '500' }}>
//                           {prompt.question}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 20,
//                             fontWeight: '600',
//                             marginTop: 20,
//                           }}>
//                           {prompt.answer}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           shadowColor: '#000',
//                           shadowOffset: { width: 0, height: 1 },
//                           shadowOpacity: 0.25,
//                           shadowRadius: 3.84,
//                           // Shadow properties for Android
//                           elevation: 5,
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </View>
//                     </>
//                   ))}
//                 </View>

//                 <View>
//                   {currentProfile?.imageUrls?.slice(3, 4).map((item, index) => (
//                     <View key={index} style={{ marginVertical: 10 }}>
//                       <Image
//                         style={{
//                           width: '100%',
//                           height: 350,
//                           resizeMode: 'cover',
//                           borderRadius: 10,
//                         }}
//                         source={{
//                           uri: item,
//                         }}
//                       />
//                       <Pressable
//                         onPress={() =>
//                           navigation.navigate('SendLike', {
//                             image: currentProfile?.imageUrls[index + 3],
//                             name: currentProfile?.firstName,
//                             userId: userId,
//                             likedUserId: currentProfile?._id,
//                           })
//                         }
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </Pressable>
//                     </View>
//                   ))}
//                 </View>
//                 <View style={{ marginVertical: 15 }}>
//                   {currentProfile?.prompts.slice(2, 3).map(prompt => (
//                     <>
//                       <View
//                         key={prompt.id}
//                         style={{
//                           backgroundColor: 'white',
//                           padding: 12,
//                           borderRadius: 10,
//                           height: 150,
//                           justifyContent: 'center',
//                         }}>
//                         <Text style={{ fontSize: 15, fontWeight: '500' }}>
//                           {prompt.question}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 20,
//                             fontWeight: '600',
//                             marginTop: 20,
//                           }}>
//                           {prompt.answer}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           shadowColor: '#000',
//                           shadowOffset: { width: 0, height: 1 },
//                           shadowOpacity: 0.25,
//                           shadowRadius: 3.84,
//                           // Shadow properties for Android
//                           elevation: 5,
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </View>
//                     </>
//                   ))}
//                 </View>

//                 <View>
//                   {currentProfile?.imageUrls?.slice(4, 7).map((item, index) => (
//                     <View key={index} style={{ marginVertical: 10 }}>
//                       <Image
//                         style={{
//                           width: '100%',
//                           height: 350,
//                           resizeMode: 'cover',
//                           borderRadius: 10,
//                         }}
//                         source={{
//                           uri: item,
//                         }}
//                       />
//                       <Pressable
//                         onPress={() =>
//                           navigation.navigate('SendLike', {
//                             image: currentProfile?.imageUrls[index + 4],
//                             name: currentProfile?.firstName,
//                             userId: userId,
//                             likedUserId: currentProfile?._id,
//                           })
//                         }
//                         style={{
//                           position: 'absolute',
//                           bottom: 10,
//                           right: 10,
//                           backgroundColor: 'white',
//                           width: 42,
//                           height: 42,
//                           borderRadius: 21,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                         <AntDesign name="hearto" size={25} color="#C5B358" />
//                       </Pressable>
//                     </View>
//                   ))}
//                 </View>
//               </View>

//               {/* <View
//               style={{
//                 position:"absolute",
//                 bottom: 10,
//                 left: 10,
//                 backgroundColor: 'white',
//                 width: 42,
//                 height: 42,
//                 borderRadius: 21,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Entypo name="cross" size={25} color="#C5B358" />
//             </View> */}
//             </View>
//           </>
//           {/* ))} */}
//         </View>
//       </ScrollView>
//       <Pressable
//         onPress={handleCross}
//         style={{
//           position: 'absolute',
//           bottom: 15,
//           left: 12,
//           backgroundColor: 'white',
//           width: 50,
//           height: 50,
//           borderRadius: 25,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Entypo name="cross" size={25} color="#C5B358" />
//       </Pressable>
//     </>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});



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
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { profilesData as importedProfilesData } from '../../components/profilesData'; 
// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [profilesData, setProfilesData] = useState([]);
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
//   const [currentProfile, setCurrentProfile] = useState(null);

//   useEffect(() => {
//     if (profilesData.length > 0) {
//       setCurrentProfile(profilesData[0]);
//     }
//   }, [profilesData]);

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   const fetchMatches = async () => {
//     try {
//       // Example of fetching data from API
//       // const response = await axios.get('http://localhost:3000/matches');
//       // const matches = response.data.matches;
//       // setProfilesData(matches);
      
//       // Setting data from the imported file
//       setProfilesData(importedProfilesData);
//     } catch (error) {
//       console.error('Error fetching matches:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchMatches();
//     }, []),
//   );

//   const navigateToNextProfile = () => {
//     const nextIndex = currentProfileIndex + 1;
//     if (nextIndex < profilesData.length) {
//       setCurrentProfileIndex(nextIndex);
//       setCurrentProfile(profilesData[nextIndex]);
//       navigation.navigate('Animation');
//     } else {
//       console.log('No more profiles');
//     }
//   };

//   const handleLike = () => navigateToNextProfile();
//   const handleCross = () => navigateToNextProfile();

//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.mainContainer}>
//         <View style={styles.header}>
//           <View style={styles.headerLeft}>
//             <Text style={styles.nameText}>{currentProfile?.name}</Text>
//             <View style={styles.newHereBadge}>
//               <Text style={styles.badgeText}>new here</Text>
//             </View>
//           </View>
//           <Entypo name="dots-three-horizontal" size={22} color="black" />
//         </View>

//         <View style={styles.imageContainer}>
//           {currentProfile?.photos?.length > 0 && (
//             <View>
//               <Image
//                 style={styles.profileImage}
//                 source={{ uri: currentProfile?.photos[0].image }}
//               />
//               <Pressable
//                 onPress={() =>
//                   navigation.navigate('SendLike', {
//                     image: currentProfile?.photos[0].image,
//                     name: currentProfile?.name,
//                     likedUserId: currentProfile?.id,
//                   })
//                 }
//                 style={styles.likeButton}
//               >
//                 <AntDesign name="hearto" size={25} color="#C5B358" />
//               </Pressable>
//             </View>
//           )}
//         </View>

//         <FlatList
//           data={profilesData}
//           renderItem={({ item }) => (
//             <View style={styles.profileContainer}>
//               <Image source={{ uri: item.photos[0].image }} style={styles.profileImage} />
//               <Text style={styles.profileName}>{item.name}</Text>
//               <Text style={styles.profileDetails}>
//                 {item.age} years old, {item.location}
//               </Text>
//               <Text style={styles.profileOccupation}>{item.occupation}</Text>
//             </View>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     marginTop: 55,
//     backgroundColor: '#f5f5f5',
//   },
//   mainContainer: {
//     marginHorizontal: 12,
//     marginVertical: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   nameText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   newHereBadge: {
//     backgroundColor: '#452c63',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   badgeText: {
//     textAlign: 'center',
//     color: 'white',
//   },
//   imageContainer: {
//     marginVertical: 15,
//   },
//   profileImage: {
//     width: '100%',
//     height: 350,
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
// });

// export default HomeScreen;


import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { profilesData } from '../../components/profilesData';

const HomeScreen = ({ navigation }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(profilesData[0]);
  const [animation] = useState(new Animated.Value(0));

  const navigateToNextProfile = () => {
    const nextIndex = currentProfileIndex + 1;
    if (nextIndex < profilesData.length) {
      setCurrentProfileIndex(nextIndex);
      setCurrentProfile(profilesData[nextIndex]);
      navigation.navigate('Animation');
    } else {
      console.log('No more profiles');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.profileName}>{currentProfile.name}</Text>
            <View style={styles.newHereBadge}>
              <Text style={styles.newHereText}>New Here</Text>
            </View>
          </View>
          <Entypo name="dots-three-horizontal" size={22} color="black" />
        </View>

        <View style={styles.imageContainer}>
          {currentProfile.photos?.length > 0 && (
            <Image
              style={styles.profileImage}
              source={{ uri: currentProfile.photos[0].image }}
            />
          )}
          <Pressable
            onPress={() =>
              navigation.navigate('SendLike', {
                image: currentProfile.photos[0].image,
                name: currentProfile.name,
                likedUserId: currentProfile.id,
              })
            }
            style={styles.likeButton}
          >
            <AntDesign name="hearto" size={25} color="#C5B358" />
          </Pressable>
        </View>

        <Animated.View
          style={[
            styles.detailsContainer,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }
          ]}
        >
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="cake-variant-outline" size={22} color="black" />
            <Text style={styles.detailText}>{currentProfile.age}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={20} color="black" />
            <Text style={styles.detailText}>{currentProfile.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="magnet-outline" size={20} color="black" />
            <Text style={styles.detailText}>{currentProfile.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />
            <Text style={styles.detailText}>{currentProfile.location}</Text>
          </View>
        </Animated.View>
      </View>

      <Pressable
        onPress={navigateToNextProfile}
        style={styles.crossButton}
      >
        <Entypo name="cross" size={25} color="#C5B358" />
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
  },
  profileContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  newHereBadge: {
    backgroundColor: '#452c63',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  newHereText: {
    textAlign: 'center',
    color: 'white',
  },
  imageContainer: {
    marginVertical: 15,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  detailText: {
    fontSize: 15,
  },
  crossButton: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;



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
