/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Splash = ({ navigation }) => {
  const dispatch = useDispatch()

  const loggedIn = async () => {
    await AsyncStorage.getItem('tickatrip-token').then(
      (res) => {
        setTimeout(() => {
          if (res !== null) {
            navigation.replace('bottomNavigation')
          } else {
            navigation.replace('Login')
          }
        }, 3000);
      })
  }
  

  useEffect(() => {
    loggedIn()
  }, [])

  return (
    <View style={style.SplashSection}>
      <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
        <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />
      </ImageBackground>
    </View >
  );
};

const style = StyleSheet.create({
  SplashSection: {
    width: width,
    height: height,
  },
  SplashBgImage: {
    width: width,
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BrandLogoSplash: {
    width: '60%',
    height: '20%',
    resizeMode: 'contain'
  }
})
export default Splash;