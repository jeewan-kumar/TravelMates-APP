import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../services/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { splashLoading, userInfo } = useContext(AuthContext);
  // console.log("AuthContext",AuthContext)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (!splashLoading) {
          setTimeout(() => {
            // console.log('userInfo',userInfo);
            if (userInfo) {
              // console.log('splace userinfo',userInfo.rData.token);
              const identifier = userInfo.rData.token;
              // console.log('identifier',identifier);
              navigation.navigate('Home', { identifier });
            } else {
              // console.log('userInfo',userInfo);
              navigation.navigate('Welcome');
            }
          }, 1000); 
        }
      } catch (e) {
        console.error('Failed to load auth status', e);
        navigation.navigate('Welcome');
      }
    };

    checkAuthStatus();
  }, [navigation, splashLoading, userInfo]);

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
      {splashLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      )}
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
  loading: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },
});

export default SplashScreen;
