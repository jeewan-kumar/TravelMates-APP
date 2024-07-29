
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import ForgotPasswordScreen from './screens/authScreens/ForgotPasswordScreen';
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
import SearchScreen from './screens/mainScreens/SearchScreen';
import TravelPlansScreen from './screens/mainScreens/TravelPlansScreen';
import SignInScreen from './screens/authScreens/SignInScreen';
import ResetPasswordScreen from './screens/authScreens/ResetPasswordScreen';
import VerifyOtpScreen from './screens/authScreens/VerifyOtpScreen';
import VerificationScreen from './screens/authScreens/VerificationScreen';
import SignInwithOtp from './screens/authScreens/SignInwithOtp';
import { AuthProvider } from './services/AuthContext';
import ChatListScreen from './screens/mainScreens/ChatListScreen';
import ChatDetailScreen from './screens/mainScreens/ChatDetailScreen';
import UserProfileDetails from './screens/mainScreens/UserProfileDetails';
import MatchScreen from './screens/mainScreens/MatchesScreen';
import SendLikeScreen from './screens/mainScreens/SendLikeScreen';
import ChatRoom from './screens/mainScreens/ChatRoom';
import TravelPlanDetailsScreen from './screens/mainScreens/TravelDetailsScreen';
import SignUpForm from './screens/authScreens/SignUpForm';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home';
            break;
          case 'MatchScreen':
            iconName = focused ? 'heart' : 'heart';
            break;
          case 'TravelPlans':
            iconName = focused ? 'paper-plane' : 'paper-plane';
            break;
          case 'Chat':
            iconName = focused ? 'comment' : 'comment';
            break;
          case 'Profile':
            iconName = focused ? 'user-tie' : 'user-tie';
            break;
          default:
            iconName = 'circle';
        }

        return <Icon name={iconName} size={30} color={color} />;
      },
      tabBarLabelStyle: {
        fontWeight: 'bold', 
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#2f4f4f', 
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: 'Explore TravelMates',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#2f4f4f' },
        headerTintColor: '#fff',
      }}
    />
    <Tab.Screen
      name="MatchScreen"
      component={MatchScreen}
      options={{
        headerTitle: 'Travel Match',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#2f4f4f' },
        headerTintColor: '#fff',
      }}
    />
    <Tab.Screen
      name="TravelPlans"
      component={TravelPlansScreen}
      options={{
        headerTitle: 'Travel Plans',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#2f4f4f' },
        headerTintColor: '#fff',
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatListScreen}
      options={{
        headerTitle: 'Chat',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#2f4f4f' },
        headerTintColor: '#fff',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#2f4f4f' },
        headerTintColor: '#fff',
      }}
    />
  </Tab.Navigator>
);

// Main stack navigator
const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
    <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    <Stack.Screen name="SignUpForm" component={SignUpForm} />
    <Stack.Screen name="SignInwithOtp" component={SignInwithOtp} />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="SendLike" component={SendLikeScreen} />
    <Stack.Screen name="GroupTravel" component={GroupTravelScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="TravelDetails" component={TravelDetailsScreen} />
    <Stack.Screen name="Travelers" component={TravelersScreen} />
    <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Destinations" component={DestinationsScreen} />
    <Stack.Screen name="Discover" component={DiscoverScreen} />
    <Stack.Screen name="Filter" component={FilterScreen} />
    <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    <Stack.Screen name="TravelPlanDetailsScreen" component={TravelPlanDetailsScreen} />
    <Stack.Screen name="UserProfileDetails" component={UserProfileDetails} />
    {/* <Stack.Screen name="SignUpForm" component={SignUpForm} /> */}

  </Stack.Navigator>
);

// Main App navigator
const AppNavigator = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </AuthProvider>
  </SafeAreaProvider>
);

export default AppNavigator;



// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import ForgotPasswordScreen from './screens/authScreens/ForgotPasswordScreen';
// import LoginScreen from './screens/authScreens/LoginScreen';
// import SignUpScreen from './screens/authScreens/SignUpScreen';
// import SplashScreen from './screens/authScreens/SplashScreen';
// import WelcomeScreen from './screens/authScreens/WelcomeScreen';
// import ChatScreen from './screens/mainScreens/ChatScreen';
// import DestinationsScreen from './screens/mainScreens/DestinationsScreen';
// import DiscoverScreen from './screens/mainScreens/DiscoverScreen';
// import EditProfileScreen from './screens/mainScreens/EditProfileScreen';
// import FilterScreen from './screens/mainScreens/FilterScreen';
// import GroupTravelScreen from './screens/mainScreens/GroupTravelScreen';
// import HomeScreen from './screens/mainScreens/HomeScreen';
// import NotificationScreen from './screens/mainScreens/NotificationScreen';
// import ProfileScreen from './screens/mainScreens/ProfileScreen';
// import ProfileSettingsScreen from './screens/mainScreens/ProfileSettingsScreen';
// import SettingsScreen from './screens/mainScreens/SettingsScreen';
// import TravelDetailsScreen from './screens/mainScreens/TravelDetailsScreen';
// import TravelersScreen from './screens/mainScreens/TravelersScreen';

// import SearchScreen from './screens/mainScreens/SearchScreen';
// import TravelPlansScreen from './screens/mainScreens/TravelPlansScreen';
// import SignInScreen from './screens/authScreens/SignInScreen';
// import ResetPasswordScreen from './screens/authScreens/ResetPasswordScreen';
// import VerifyOtpScreen from './screens/authScreens/VerifyOtpScreen';
// import VerificationScreen from './screens/authScreens/VerificationScreen';
// import SignInwithOtp from './screens/authScreens/SignInwithOtp';
// import { AuthProvider } from './services/AuthContext';
// import ChatListScreen from './screens/mainScreens/ChatListScreen';
// import ChatDetailScreen from './screens/mainScreens/ChatDetailScreen';
// import UserProfileDetails from './screens/mainScreens/UserProfileDetails';
// import MatchScreen from './screens/mainScreens/MatchesScreen';
// import SendLikeScreen from './screens/mainScreens/SendLikeScreen';
// import ChatRoom from './screens/mainScreens/ChatRoom';
// import TravelPlanDetailsScreen from './screens/mainScreens/TravelDetailsScreen';



// // Create navigators
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom tab navigator
// const TabNavigator = () => (
//   <Tab.Navigator>
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{headerTitle:'Explore TravelMates', headerTitleAlign:"center",
//         tabBarIcon: () => <Icon name="home" size={25} />,
//       }}
//     />
//     <Tab.Screen
//       name="MatchScreen"
//       component={MatchScreen}
//       options={{
//         tabBarLabel: 'Match',
//         tabBarIcon: () => <Icon name="heart" size={25} />,
//       }}
//     />
//     <Tab.Screen
//       name="TravelPlans"
//       component={TravelPlansScreen}
//       options={{
//         tabBarLabel: 'Travel Plans',
//         tabBarIcon: () => <Icon name="paper-plane" size={25} />,
//       }}
//     />
//     <Tab.Screen
//       name="Chat"
//       component={ChatListScreen}
//       options={{
//         tabBarLabel: 'Chat',
//         tabBarIcon: () => <Icon name="comment" size={25} />,
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarLabel: 'Profile',
//         tabBarIcon: () => <Icon name="user-tie" size={25} />,
//       }}
//     />
//   </Tab.Navigator>
// );

// // Main stack navigator
// const MainStackNavigator = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
//     <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
//     <Stack.Screen name="Welcome" component={WelcomeScreen}options={{ headerShown: false }} />
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//     <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
//     <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
//     <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
//     <Stack.Screen name="SignInwithOtp" component={SignInwithOtp} />
//     <Stack.Screen name="Home" component={TabNavigator} />
//     <Stack.Screen name="SendLike" component={SendLikeScreen} />
//     <Stack.Screen name="GroupTravel" component={GroupTravelScreen} />
//     <Stack.Screen name="Settings" component={SettingsScreen} />
//     <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//     <Stack.Screen name="TravelDetails" component={TravelDetailsScreen} />
//     <Stack.Screen name="Travelers" component={TravelersScreen} />
//     <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
//     <Stack.Screen name="Notification" component={NotificationScreen} />
//     <Stack.Screen name="Destinations" component={DestinationsScreen} />
//     <Stack.Screen name="Discover" component={DiscoverScreen} />
//     <Stack.Screen name="Filter" component={FilterScreen} />
//     <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
//     <Stack.Screen name="TravelPlanDetailsScreen" component={TravelPlanDetailsScreen} />



    
//   </Stack.Navigator>
// );

// // Main App navigator
// const AppNavigator = () => (
//   <SafeAreaProvider>
//     <AuthProvider>
//       <NavigationContainer>
//         <MainStackNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   </SafeAreaProvider>
// );

// export default AppNavigator;
