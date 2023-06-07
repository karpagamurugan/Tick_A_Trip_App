/* eslint-disable prettier/prettier */
import React from 'react'
import { Dimensions, ImageBackground, ScrollView, View, Text } from 'react-native'
import Appbar from '../common/Appbar'
import HotelSearch from './HotelSearch'
import style from '../common/commonStyle'
import FONTS from '../constants/font'
import color from '../constants/color'
import PopularPlaceCard from '../Home/PopularPlaceCard'
import HotelAppbar from '../common/HotelAppbar'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Hotel = ({navigation}) => {
  return (
    <View style={{backgroundColor:'white'}}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../Assert/Images/hotel-bg.png')}
          style={{ width: width, height: height * 0.36 }} resizeMode="contain">
                    <HotelAppbar title='Hotel' />
        </ImageBackground>
        <HotelSearch navigation={navigation} />
        <View style={style.HotelPopularList}>
          <Text style={{ fontFamily: FONTS.fontSemi, letterSpacing: 0.5, fontSize: 18, marginVertical: 20, color: color.colorText, }}>Most Popular Place</Text>
          <View style={style.PopularPlaceCard} >
                <PopularPlaceCard navigation={navigation}/>
              </View>

        </View>

      </ScrollView>

    </View>
  )
}

export default React.memo(Hotel)