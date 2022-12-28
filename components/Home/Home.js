/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import font from '../../constants/font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import color from '../../constants/color';
import PopularPlaceCard from './PopularPlaceCard';
import NearestPlaceCard from './NearestPlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Home = ({ navigation }) => {
  const UserToken = (async) => {
    AsyncStorage.getItem('tickatrip-token').then((res) => console.log('token', res))
  }
  useEffect(() => {
    UserToken()
  }, [])
  return (
    <ScrollView >
      <View style={{ width: width, paddingHorizontal: 20, }}>
        <Text style={style.bannerTd}>Explore the  World with us</Text>
        <View style={style.bannerBtns}>
          <TouchableHighlight  underlayColor={"transparent"} onPress={()=>navigation.navigate('HotelTab')}>
            <View style={style.bannerBtnsGrid}>
              <View style={style.bannerBtnsIcon}><FontAwesome5 style={style.bannerBtnIconIn} name='hotel' /></View>
              <Text style={style.bannerBtnsTd}>Hotels</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginLeft: 20 }} underlayColor={"transparent"} onPress={()=>navigation.navigate('FlightTab')}>
            <View style={style.bannerBtnsGrid}>
              <View style={style.bannerBtnsIcon}><MaterialCommunityIcons style={style.bannerBtnIconIn} name='airplane' /></View>
              <Text style={style.bannerBtnsTd}>Flights</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={style.PopularPlace}>
          <View style={style.PopularPlaceHead}>
            <Text style={style.PopularPlaceHeadTd}>Top Packages</Text>
            <TouchableHighlight ><Text style={style.PopularPlaceHeadmore}>See More</Text></TouchableHighlight>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* <View style={style.PopularPlaceList}> */}
            {[...Array(5)].map((val, index) => (
              <View style={style.PopularPlaceCard} key={index} >
                <PopularPlaceCard />
              </View>
            ))}
            {/* </View> */}
          </ScrollView>

        </View>
        <View style={style.PopularPlace}>
          <View style={style.PopularPlaceHead}>
            <Text style={style.PopularPlaceHeadTd}>Hotels For You</Text>
            <TouchableHighlight ><Text style={style.PopularPlaceHeadmore}>See More</Text></TouchableHighlight>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(5)].map((val, index) => (
              <View style={style.PopularPlaceCard} key={index} >
                <NearestPlaceCard />
              </View>
            ))}
          </ScrollView>

        </View>
      </View>
    </ScrollView>

  );
};
const style = StyleSheet.create({
  PopularPlaceList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  PopularPlaceCard: {
    width: width * 0.4,
    marginRight: 20
  },
  PopularPlaceHeadmore: {
    fontFamily: font.fontSemi,
    color: '#FE712A',
  },
  PopularPlace: {
    paddingVertical: 30,
  },
  PopularPlaceHeadTd: {
    fontFamily: font.fontBold,
    fontSize: 20,
    color: color.colorText,
    letterSpacing: 1,
  },
  PopularPlaceHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerBtnsTd: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: font.mediam,
    color: '#333333'
  },
  bannerBtnsIcon: {
    backgroundColor: '#4C94F2',
    width: width * 0.2,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bannerTd: {
    color: '#333333',
    fontSize: 32,
    fontFamily: font.fontBold,
    width: width * 0.7,
    lineHeight: 50,
    paddingVertical: 30,
    letterSpacing: 1,
  },
  bannerBtnsGrid: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerBtns: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerBtnIconIn: {
    color: '#fff',
    fontSize: 40,
  },
})
export default Home;
