/* eslint-disable prettier/prettier */
import React from 'react'
import { Dimensions, ImageBackground, View } from 'react-native'
import Appbar from '../../common/Appbar'
import HotelSearch from './HotelSearch'
import style from '../../common/commonStyle'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Hotel = () => {
  return (
    <View>
      <Appbar title='Hotel' />
      <ImageBackground
        source={require('../../../Assert/Images/hotel-bg.png')}
        style={{ width: width, height: height * 0.2 }} resizeMode="cover">
      </ImageBackground>
      <HotelSearch />
    </View>
  )
}

export default Hotel