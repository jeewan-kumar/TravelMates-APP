
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../components/ProfilePicture';
import ProfileDetail from '../../components/ProfileDetail';
import EditButton from '../../components/EditButton';
import { AuthContext } from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../../components/LogoutButton';

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
            profile_picture: userArray[0][9] || '', 
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

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchUserProfile();
  //   }, [fetchUserProfile])
  // );
  

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  // const handleLogout = () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure you want to logout?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: async () => {
  //           await logout();
  //           navigation.reset({
  //             index: 0,
  //             routes: [{ name: 'SignIn' }],
  //           });
  //         },
  //         style: 'destructive',
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profilePictureContainer}>
        {user?.profile_picture ? (
          <Image
            source={{ uri: `data:image/jpg;base64,${user.profile_picture}` }}
            style={styles.profilePicture}
          />
        ) : (
          <ProfilePicture uri="" /> 
        )}
      </View>
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
      {/* <LogoutButton/> */}
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
  profilePictureContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
