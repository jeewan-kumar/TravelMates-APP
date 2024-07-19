import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ForgotPasswordScreen from './screens/authScreens/ForgotPasswordScreen';
import LoginScreen from './screens/authScreens/LoginScreen';
import SignUpScreen from './screens/authScreens/SignUpScreen';
import SplashScreen from './screens/authScreens/SplashScreen';
import WelcomeScreen from './screens/authScreens/WelcomeScreen';
import ChatScreen from './screens/mainScreens/ChatScreen';
import DestinationsScreen from './screens/mainScreens/DestinationsScreen';
import DiscoverScreen from './screens/mainScreens/DiscoverScreen';
import EditProfileScreen from './screens/mainScreens/EditProfileScreen';
import FilterScreen from './screens/mainScreens/FilterScreen';
import GroupTravelScreen from './screens/mainScreens/GroupTravelScreen';
import HomeScreen from './screens/mainScreens/HomeScreen';
import NotificationScreen from './screens/mainScreens/NotificationScreen';
import ProfileScreen from './screens/mainScreens/ProfileScreen';
import ProfileSettingsScreen from './screens/mainScreens/ProfileSettingsScreen';
import SettingsScreen from './screens/mainScreens/SettingsScreen';
import TravelDetailsScreen from './screens/mainScreens/TravelDetailsScreen';
import TravelersScreen from './screens/mainScreens/TravelersScreen';
import UserProfileScreen from './screens/mainScreens/UserProfileScreen';
import SearchScreen from './screens/mainScreens/SearchScreen';
import TravelPlansScreen from './screens/mainScreens/TravelPlansScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignInScreen from './screens/authScreens/SignInScreen';
import ResetPasswordScreen from './screens/authScreens/ResetPasswordScreen';
import VerifyOtpScreen from './screens/authScreens/VerifyOtpScreen';
import VerificationScreen from './screens/authScreens/VerificationScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
    <Tab.Screen name="TravelPlans" component={TravelPlansScreen} options={{ tabBarLabel: 'Travel Plans' }} />
    <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarLabel: 'Chat' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
  </Tab.Navigator>
);


const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Welcome'>
    {/* <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/> */}
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} /> 
    {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false}}/> */}
    {/* <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="UserProfile" component={UserProfileScreen} /> */}
    {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
    {/* <Stack.Screen name="GroupTravel" component={GroupTravelScreen} /> */}
    {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    {/* <Stack.Screen name="EditProfile" component={EditProfileScreen} /> */}
    {/* <Stack.Screen name="TravelDetails" component={TravelDetailsScreen} /> */}
    {/* <Stack.Screen name="Travelers" component={TravelersScreen} /> */}
    {/* <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} /> */}
    {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
    {/* <Stack.Screen name="Destinations" component={DestinationsScreen} /> */}
    {/* <Stack.Screen name="Discover" component={DiscoverScreen} /> */}
    {/* <Stack.Screen name="Filter" component={FilterScreen} /> */}
  </Stack.Navigator>
);


const AppNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default AppNavigator;

const styles = StyleSheet.create({

});
