
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../components/ProfilePicture';
import ProfileDetail from '../../components/ProfileDetail';
import EditButton from '../../components/EditButton';
import { AuthContext } from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      if (!userInfo || !userInfo.rData || !userInfo.rData.user_id) {
        console.error('Invalid user data');
        return;
      }

      const response = await fetch('http://192.168.33.157:5164/TravelMates_UserProfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID: "1003",
          addInfo: {
            user_id: userInfo.rData.user_id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (jsonResponse.rStatus === 0 && jsonResponse.rData && jsonResponse.rData.lessons) {
        const userArray = jsonResponse.rData.lessons[0];
        if (userArray[0] && userArray.length > 0) {
          const travelPreferencesArray = userArray[0][13] ? JSON.parse(userArray[0][13]) : [];
          const travelTypesArray = userArray[0][14] ? JSON.parse(userArray[0][14]) : [];
          const travelingintentionsArray = userArray[0][15] ? JSON.parse(userArray[0][15]) : [];
          const interestsArray = userArray[0][30] ? JSON.parse(userArray[0][30]) : [];
          
          const userData = {
            full_name: userArray[0][1] || 'Unknown',
            date_of_birth: userArray[0][4] || 'N/A',
            bio: userArray[0][33] || 'No bio available',
            location: userArray[0][10] || 'Location not specified',
            gender: userArray[0][11] || 'Gender not specified',
            travel_preferences: travelPreferencesArray.join(', ') || 'N/A',
            travel_types: travelTypesArray.join(', ') || 'N/A',
            traveling_intentions: travelingintentionsArray.join(', ') || 'N/A',
            job_title: userArray[0][18] || 'Not specified',
            workplace: userArray[0][19] || 'Not specified',
            education: userArray[0][20] || 'Not specified',
            religious_beliefs: userArray[0][22] || 'Not specified',
            interests: interestsArray.join(', ') || 'N/A',
          };

          setUser(userData);
        } else {
          console.error('No user data found in profile array');
        }
      } else {
        console.error('Invalid response structure or rStatus is not 0');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfilePicture uri={user?.profile_picture} />
      <Text style={styles.name}>{user?.full_name}</Text>
      <Text style={styles.bio}>{user?.bio}</Text>
      <View style={styles.detailsContainer}>
        <ProfileDetail label="Date of Birth" value={user?.date_of_birth} />
        <ProfileDetail label="Location" value={user?.location} />
        <ProfileDetail label="Gender" value={user?.gender} />
        <ProfileDetail label="Travel Preferences" value={user?.travel_preferences} />
        <ProfileDetail label="Travel Types" value={user?.travel_types} />
        <ProfileDetail label="Traveling Intentions" value={user?.traveling_intentions} />
        <ProfileDetail label="Job Title" value={user?.job_title} />
        <ProfileDetail label="Workplace" value={user?.workplace} />
        <ProfileDetail label="Education" value={user?.education} />
        <ProfileDetail label="Religious Beliefs" value={user?.religious_beliefs} />
        <ProfileDetail label="Interests" value={user?.interests} />
      </View>
      <EditButton onPress={() => navigation.navigate('EditProfile')} />
      <Button title="Sign Out" onPress={handleLogout} color="#ff0000" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default ProfileScreen;




// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import ProfilePicture from '../../components/ProfilePicture';
// import ProfileDetail from '../../components/ProfileDetail';
// import EditButton from '../../components/EditButton';
// import { AuthContext } from '../../services/AuthContext';

// const dummyUserData = {
//   first_name: 'John',
//   last_name: 'Doe',
//   email: 'john.doe@example.com',
//   phone_number: '123-456-7890',
//   date_of_birth: '1990-01-01',
//   location: 'San Francisco, CA',
//   gender: 'Male',
//   sexuality: 'Straight',
//   travel_preferences: 'Beach, Adventure',
//   travel_types: 'Solo, Group',
//   traveling_intentions: 'Leisure, Exploration',
//   children_status: 'No',
//   family_details: 'Single, no children',
//   hometown: 'Los Angeles, CA',
//   job_title: 'Software Engineer',
//   workplace: 'TechCorp',
//   education: 'Bachelor\'s in Computer Science',
//   political_beliefs: 'Liberal',
//   religious_beliefs: 'Agnostic',
//   highest_education_level: 'Bachelor\'s Degree',
//   drinking_habits: 'Socially',
//   smoking_tobacco: 'No',
//   smoking_weed: 'Occasionally',
//   drug_use: 'No',
//   workout_habits: 'Regularly',
//   pets: 'Dog',
//   interests: 'Traveling, Coding, Hiking',
//   values_in_person: 'Honesty, Kindness',
//   profile_pictures: 'https://example.com/profile.jpg',
//   bio: 'Passionate traveler and software engineer.',
// };

// const ProfileScreen = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const { logout } = useContext(AuthContext);

//   useEffect(() => {
//     // Replace this with actual API call
//     setTimeout(() => {
//       setUser(dummyUserData);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleLogout = async () => {
//     await logout(); 
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ProfilePicture uri={user.profile_pictures} />
//       <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
//       <Text style={styles.bio}>{user.bio}</Text>
//       <View style={styles.detailsContainer}>
//         <ProfileDetail label="Email" value={user.email} />
//         <ProfileDetail label="Phone" value={user.phone_number} />
//         <ProfileDetail label="Date of Birth" value={user.date_of_birth} />
//         <ProfileDetail label="Location" value={user.location} />
//         <ProfileDetail label="Gender" value={user.gender} />
//         <ProfileDetail label="Sexuality" value={user.sexuality} />
//         <ProfileDetail label="Travel Preferences" value={user.travel_preferences} />
//         <ProfileDetail label="Travel Types" value={user.travel_types} />
//         <ProfileDetail label="Traveling Intentions" value={user.traveling_intentions} />
//         <ProfileDetail label="Children Status" value={user.children_status} />
//         <ProfileDetail label="Family Details" value={user.family_details} />
//         <ProfileDetail label="Hometown" value={user.hometown} />
//         <ProfileDetail label="Job Title" value={user.job_title} />
//         <ProfileDetail label="Workplace" value={user.workplace} />
//         <ProfileDetail label="Education" value={user.education} />
//         <ProfileDetail label="Political Beliefs" value={user.political_beliefs} />
//         <ProfileDetail label="Religious Beliefs" value={user.religious_beliefs} />
//         <ProfileDetail label="Highest Education Level" value={user.highest_education_level} />
//         <ProfileDetail label="Drinking Habits" value={user.drinking_habits} />
//         <ProfileDetail label="Smoking Tobacco" value={user.smoking_tobacco} />
//         <ProfileDetail label="Smoking Weed" value={user.smoking_weed} />
//         <ProfileDetail label="Drug Use" value={user.drug_use} />
//         <ProfileDetail label="Workout Habits" value={user.workout_habits} />
//         <ProfileDetail label="Pets" value={user.pets} />
//         <ProfileDetail label="Interests" value={user.interests} />
//         <ProfileDetail label="Values in Person" value={user.values_in_person} />
//       </View>
//       <EditButton onPress={() => navigation.navigate('EditProfile')} />
//       <Button title="Sign Out" onPress={handleLogout} color="#ff0000" />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginVertical: 10,
//     paddingHorizontal: 20,
//   },
//   detailsContainer: {
//     width: '100%',
//     marginTop: 20,
//   },
// });

// export default ProfileScreen;
