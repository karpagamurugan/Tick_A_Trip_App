/* eslint-disable prettier/prettier */
import React from 'react'
import { Dimensions, ImageBackground, ScrollView, View, Text } from 'react-native'
import Appbar from '../common/Appbar'
import HotelSearch from './HotelSearch'
import style from '../common/commonStyle'
import font from '../constants/font'
import color from '../constants/color'
import PopularPlaceCard from '../Home/PopularPlaceCard'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Hotel = ({navigation}) => {
  return (
    <View>
      <ScrollView>
        <Appbar title='Hotel' />
        <ImageBackground
          source={require('../../Assert/Images/hotel-bg.png')}
          style={{ width: width, height: height * 0.2 }} resizeMode="cover">
        </ImageBackground>
        <HotelSearch navigation={navigation}/>
        <View style={style.HotelPopularList}>
          <Text style={{ fontFamily: font.fontSemi, letterSpacing: 0.5, fontSize: 18, marginVertical: 20, color: color.colorText, }}>Most Popular Place</Text>
          <View style={style.PopularPlaceCard} >
                <PopularPlaceCard navigation={navigation}/>
              </View>

        </View>

      </ScrollView>

    </View>
  )
}

export default Hotel