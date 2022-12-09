/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, StyleSheet } from 'react-native';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Splash = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login')
    }, 3000)
  })
  
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