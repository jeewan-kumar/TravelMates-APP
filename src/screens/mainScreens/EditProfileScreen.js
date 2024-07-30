import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfilePicture from '../../components/ProfilePicture';

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    location: '',
    gender: '',
    travel_preferences: [],
    travel_types: [],
    traveling_intentions: [],
    job_title: '',
    workplace: '',
    education: '',
    religious_beliefs: '',
    interests: [],
    bio: '',
    profile_picture: '',
  });
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

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
        if (userArray && userArray.length > 0) {
          const travelPreferencesArray = userArray[0][13] ? JSON.parse(userArray[0][13]) : [];
          const travelTypesArray = userArray[0][14] ? JSON.parse(userArray[0][14]) : [];
          const travelingIntentionsArray = userArray[0][15] ? JSON.parse(userArray[0][15]) : [];
          const interestsArray = userArray[0][30] ? JSON.parse(userArray[0][30]) : [];

          setFormData({
            full_name: userArray[0][1] || '',
            date_of_birth: userArray[0][4] || '',
            location: userArray[0][10] || '',
            gender: userArray[0][11] || '',
            travel_preferences: travelPreferencesArray,
            travel_types: travelTypesArray,
            traveling_intentions: travelingIntentionsArray,
            job_title: userArray[0][18] || '',
            workplace: userArray[0][19] || '',
            education: userArray[0][20] || '',
            religious_beliefs: userArray[0][22] || '',
            interests: interestsArray,
            bio: userArray[0][33] || '',
            profile_picture: userArray[0][9] || '',
          });
          setBase64Image(userArray[0][9] || '');
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

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      const response = await fetch('http://192.168.33.157:5164/TravelMates_UserProfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID: "1005",
          addInfo: {
            user_id: userInfo.rData.user_id,
            ...formData,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (jsonResponse.rStatus === 0) {
        console.log('Profile updated successfully');
        navigation.goBack();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true, 
        maxWidth: 300, 
        maxHeight: 300, 
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setBase64Image(selectedImage.base64);
        }
      }
    );
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
      <Text style={styles.label}>Profile Picture</Text>
      
      <View style={styles.profileCard}>
        {base64Image ? (
          <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${base64Image}` }} />
        ) : (
          <Text style={styles.noPictureText}>No profile picture</Text>
        )}
        <Button title="Choose New Image" onPress={handleChooseImage} />
      </View>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={formData.full_name}
        onChangeText={(text) => setFormData({ ...formData, full_name: text })}
      />
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={formData.date_of_birth}
        onChangeText={(text) => setFormData({ ...formData, date_of_birth: text })}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={formData.gender}
        onChangeText={(text) => setFormData({ ...formData, gender: text })}
      />
      <Text style={styles.label}>Travel Preferences</Text>
      <TextInput
        style={styles.input}
        value={formData.travel_preferences.join(', ')}
        onChangeText={(text) => setFormData({ ...formData, travel_preferences: text.split(',').map(item => item.trim()) })}
      />
      <Text style={styles.label}>Travel Types</Text>
      <TextInput
        style={styles.input}
        value={formData.travel_types.join(', ')}
        onChangeText={(text) => setFormData({ ...formData, travel_types: text.split(',').map(item => item.trim()) })}
      />
      <Text style={styles.label}>Traveling Intentions</Text>
      <TextInput
        style={styles.input}
        value={formData.traveling_intentions.join(', ')}
        onChangeText={(text) => setFormData({ ...formData, traveling_intentions: text.split(',').map(item => item.trim()) })}
      />
      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={formData.job_title}
        onChangeText={(text) => setFormData({ ...formData, job_title: text })}
      />
      <Text style={styles.label}>Workplace</Text>
      <TextInput
        style={styles.input}
        value={formData.workplace}
        onChangeText={(text) => setFormData({ ...formData, workplace: text })}
      />
      <Text style={styles.label}>Education</Text>
      <TextInput
        style={styles.input}
        value={formData.education}
        onChangeText={(text) => setFormData({ ...formData, education: text })}
      />
      <Text style={styles.label}>Religious Beliefs</Text>
      <TextInput
        style={styles.input}
        value={formData.religious_beliefs}
        onChangeText={(text) => setFormData({ ...formData, religious_beliefs: text })}
      />
      <Text style={styles.label}>Interests</Text>
      <TextInput
        style={styles.input}
        value={formData.interests.join(', ')}
        onChangeText={(text) => setFormData({ ...formData, interests: text.split(',').map(item => item.trim()) })}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        value={formData.bio}
        onChangeText={(text) => setFormData({ ...formData, bio: text })}
      />
      <Button title="Save" onPress={handleUpdateProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  noPictureText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
});

export default EditProfileScreen;
